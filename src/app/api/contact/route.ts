// src/app/api/contact/route.ts

import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate';
import { ProspectConfirmationEmailTemplate } from '@/components/email/ProspectConfirmationEmailTemplate';
import { createCrmLead } from '@/lib/odoo';

const resend = new Resend(process.env.RESEND_API_KEY);

// Siempre se avisa a estas direcciones, se haya podido cargar el lead en el
// CRM o no — la idea es que nunca quede un prospecto sin que alguien lo vea.
const NOTIFY_EMAILS = ['gas@datelia.com.ar', 'jimenagarciapinto@datelia.com.ar', 'info@datelia.com.ar'];

// Rate limiting en memoria, best-effort: se resetea en cada cold start de la
// función serverless. Suficiente para frenar spam básico, no para volumen alto.
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactFormSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(200),
  empresa: z.string().min(1, 'La empresa es requerida').max(200),
  contacto: z.string().min(1, 'El email o WhatsApp es requerido').max(200),
  tarea: z.string().max(5000).optional().default(''),
  // Honeypot: campo que no debe estar visible en el formulario real.
  // Si viene con algo, es casi seguro un bot.
  website_url: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intentá de nuevo en unos minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => issue.message).join(', ');
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const { nombre, empresa, contacto, tarea, website_url } = validationResult.data;

    // Honeypot: si viene con contenido, devolvemos un 200 falso para no
    // delatarle al bot que fue detectado, y no hacemos nada más.
    if (website_url.trim() !== '') {
      console.log(`[HONEYPOT] Spam detectado desde IP ${clientIp}`);
      return NextResponse.json({ message: 'Email enviado con éxito!' }, { status: 200 });
    }

    let crmStatus: 'created' | 'failed' = 'failed';
    let crmUrl: string | undefined;

    try {
      const lead = await createCrmLead({
        nombre,
        empresa,
        contacto,
        tarea,
        sourceLabel: 'Formulario web',
      });
      crmStatus = 'created';
      crmUrl = lead.url;
    } catch (odooError) {
      // No dejamos que un problema con Odoo tumbe el aviso por mail: el mail
      // es la red de seguridad para que el lead nunca quede en silencio.
      console.error('Error creando lead en Odoo:', odooError);
    }

    const { data, error } = await resend.emails.send({
      from: 'Datelia <info@datelia.com.ar>',
      to: NOTIFY_EMAILS,
      subject: crmStatus === 'created'
        ? `Nuevo prospecto: ${empresa} (${nombre})`
        : `⚠️ Nuevo prospecto: ${empresa} (${nombre}) — revisar, no se cargó solo en el CRM`,
      react: ContactEmailTemplate({
        nombre,
        empresa,
        contacto,
        tarea,
        crmStatus,
        crmUrl,
      }),
    });

    if (error) {
      console.error('Error desde Resend:', error);
      return NextResponse.json({ error: 'Error al enviar el email.' }, { status: 500 });
    }

    // Autorespuesta al prospecto, solo si "contacto" parece un email (puede
    // ser un número de WhatsApp, y a eso no le podemos mandar un mail). No
    // bloquea la respuesta principal si falla.
    if (EMAIL_REGEX.test(contacto)) {
      try {
        const { error: autoResponseError } = await resend.emails.send({
          from: 'Datelia <info@datelia.com.ar>',
          to: contacto,
          subject: 'Recibimos tu mensaje — Datelia',
          react: ProspectConfirmationEmailTemplate({ nombre }),
        });
        if (autoResponseError) {
          console.warn('Error enviando autorespuesta al prospecto:', autoResponseError);
        }
      } catch (autoResponseErr) {
        console.warn('Error en autorespuesta (catch):', autoResponseErr);
      }
    }

    return NextResponse.json({ message: 'Email enviado con éxito!', data }, { status: 200 });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
