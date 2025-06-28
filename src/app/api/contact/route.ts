// src/app/api/contact/route.tsx

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate'; // Importamos nuestro componente

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'Datelia <onboarding@resend.dev>', // Reemplaza con tu dominio verificado
      to: ['info@datelia.tech'],
      subject: `Nueva consulta de ${body.nombre} desde la web`,
      // Aquí usamos nuestro componente de React limpio
      react: ContactEmailTemplate({ 
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        empresa: body.empresa,
        sector: body.sector,
        mensaje: body.mensaje,
        howFound: body.howFound,
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