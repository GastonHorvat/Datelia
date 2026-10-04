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
const ORGANIZATION_URI = 'https://api.calendly.com/organizations/5ce9147d-7a7d-4166-a229-a3c1ac93afc6';
const LOOKBACK_DAYS = 3; // margen de sobra para no perder ninguna si un día falla el cron

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const events = await listRecentBookings(ORGANIZATION_URI, LOOKBACK_DAYS);

  let nuevos = 0;

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

  return NextResponse.json({ message: `${nuevos} reserva(s) nueva(s) procesada(s).` }, { status: 200 });
}
