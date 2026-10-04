// src/app/api/calendly-webhook/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CalendlyEmailTemplate } from '@/components/email/CalendlyEmailTemplate';
import { createCalendlyLead } from '@/lib/odoo';
import { verifyCalendlySignature, type CalendlyInviteeCreatedPayload } from '@/lib/calendly';

const resend = new Resend(process.env.RESEND_API_KEY);
const SIGNING_KEY = process.env.CALENDLY_SIGNING_KEY!;

const NOTIFY_EMAILS = ['gas@datelia.com.ar', 'jimenagarciapinto@datelia.com.ar', 'info@datelia.com.ar'];

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get('calendly-webhook-signature');

  if (!verifyCalendlySignature(rawBody, signatureHeader, SIGNING_KEY)) {
    return NextResponse.json({ error: 'Firma inválida.' }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as CalendlyInviteeCreatedPayload;

  if (body.event !== 'invitee.created') {
    return NextResponse.json({ message: 'Evento ignorado.' }, { status: 200 });
  }

  const { name, email, uri, questions_and_answers, scheduled_event } = body.payload;

  let crmStatus: 'created' | 'failed' = 'failed';
  let crmUrl: string | undefined;

  try {
    const lead = await createCalendlyLead({
      inviteeUri: uri,
      nombre: name,
      email,
      tituloEvento: scheduled_event.name,
      horaInicio: scheduled_event.start_time,
      preguntasYRespuestas: questions_and_answers || [],
    });
    crmStatus = 'created';
    crmUrl = lead.url;
  } catch (odooError) {
    console.error('Error creando lead de Calendly en Odoo:', odooError);
  }

  const fecha = new Date(scheduled_event.start_time).toLocaleString('es-AR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  const { error } = await resend.emails.send({
    from: 'Datelia <info@datelia.com.ar>',
    to: NOTIFY_EMAILS,
    subject: crmStatus === 'created'
      ? `Nueva reunión agendada: ${name}`
      : `⚠️ Nueva reunión agendada: ${name} — revisar, no se cargó solo en el CRM`,

    react: CalendlyEmailTemplate({ nombre: name, email, tituloEvento: scheduled_event.name, fecha, crmStatus, crmUrl }),
  });

  if (error) {
    console.error('Error desde Resend (calendly-webhook):', error);
    return NextResponse.json({ error: 'Error al enviar el email.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'OK' }, { status: 200 });
}
