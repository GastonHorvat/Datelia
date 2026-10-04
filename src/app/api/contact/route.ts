// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate';
import { createCrmLead } from '@/lib/odoo';

const resend = new Resend(process.env.RESEND_API_KEY);

// Siempre se avisa a estas direcciones, se haya podido cargar el lead en el
// CRM o no — la idea es que nunca quede un prospecto sin que alguien lo vea.
const NOTIFY_EMAILS = ['gas@datelia.com.ar', 'jimenagarciapinto@datelia.com.ar', 'info@datelia.com.ar'];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let crmStatus: 'created' | 'failed' = 'failed';
    let crmUrl: string | undefined;

    try {
      const lead = await createCrmLead({
        nombre: body.nombre,
        empresa: body.empresa,
        contacto: body.contacto,
        tarea: body.tarea,
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
        ? `Nuevo prospecto: ${body.empresa} (${body.nombre})`
        : `⚠️ Nuevo prospecto: ${body.empresa} (${body.nombre}) — revisar, no se cargó solo en el CRM`,

      react: ContactEmailTemplate({
        nombre: body.nombre,
        empresa: body.empresa,
        contacto: body.contacto,
        tarea: body.tarea,
        crmStatus,
        crmUrl,
      }),
    });

    if (error) {
      console.error("Error desde Resend:", error);
      return NextResponse.json({ error: 'Error al enviar el email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email enviado con éxito!', data }, { status: 200 });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
