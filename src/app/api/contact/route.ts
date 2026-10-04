// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Datelia <info@datelia.com.ar>',
      to: ['info@datelia.com.ar'],
      subject: `Nueva consulta de ${body.empresa} (${body.nombre})`,

      react: ContactEmailTemplate({
        nombre: body.nombre,
        empresa: body.empresa,
        contacto: body.contacto,
        tarea: body.tarea,
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
