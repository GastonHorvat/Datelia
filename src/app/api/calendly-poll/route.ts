// src/app/api/calendly-poll/route.ts
// Disparado por el cron de Vercel una vez por día. Como el plan de Calendly
// es free (sin webhooks), en vez de que Calendly nos avise, le preguntamos
// nosotros: traemos los eventos agendados recientes y cargamos los que
// todavía no estén en el CRM (ver calendlyLeadExists en lib/odoo.ts).

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CalendlyEmailTemplate } from '@/components/email/CalendlyEmailTemplate';
import { createCalendlyLead, calendlyLeadExists } from '@/lib/odoo';
import { listRecentBookings } from '@/lib/calendly';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAILS = ['gas@datelia.com.ar', 'jimenagarciapinto@datelia.com.ar', 'info@datelia.com.ar'];
const LOOKBACK_DAYS = 3; // margen de sobra para no perder ninguna si un día falla el cron

// Cada cuenta de Calendly es gratis y propia de cada persona -- no hace
// falta pagar un plan de equipo para que las dos entren al mismo CRM.
// Agregar a alguien más es: que genere su propio token (gratis, mismos
// pasos que Gastón) y sumar su variable de entorno acá.
const ACCOUNTS: { pat: string; label: string }[] = [
  { pat: process.env.CALENDLY_PAT!, label: 'Gastón' },
  ...(process.env.CALENDLY_PAT_JIMENA ? [{ pat: process.env.CALENDLY_PAT_JIMENA, label: 'Jimena' }] : []),
];

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  let nuevos = 0;

  for (const account of ACCOUNTS) {
    const events = await listRecentBookings(account.pat, LOOKBACK_DAYS);

    for (const event of events) {
      for (const invitee of event.invitees) {
        if (await calendlyLeadExists(invitee.uri)) continue;

        let crmStatus: 'created' | 'failed' = 'failed';
        let crmUrl: string | undefined;

        try {
          const lead = await createCalendlyLead({
            inviteeUri: invitee.uri,
            nombre: invitee.name,
            email: invitee.email,
            tituloEvento: event.name,
            horaInicio: event.start_time,
            preguntasYRespuestas: invitee.questions_and_answers,
          });
          crmStatus = 'created';
          crmUrl = lead.url;
        } catch (odooError) {
          console.error('Error creando lead de Calendly en Odoo:', odooError);
        }

        const fecha = new Date(event.start_time).toLocaleString('es-AR', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'America/Argentina/Buenos_Aires',
        });

        await resend.emails.send({
          from: 'Datelia <info@datelia.com.ar>',
          to: NOTIFY_EMAILS,
          subject: crmStatus === 'created'
            ? `Nueva reunión agendada: ${invitee.name}`
            : `⚠️ Nueva reunión agendada: ${invitee.name} — revisar, no se cargó solo en el CRM`,
          react: CalendlyEmailTemplate({ nombre: invitee.name, email: invitee.email, tituloEvento: event.name, fecha, crmStatus, crmUrl }),
        });

        nuevos++;
      }
    }
  }

  return NextResponse.json({ message: `${nuevos} reserva(s) nueva(s) procesada(s).` }, { status: 200 });
}
