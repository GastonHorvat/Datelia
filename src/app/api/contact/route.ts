// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
// Asegúrate que esta ruta sea correcta según donde creaste el archivo de la plantilla
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate'; 

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await resend.emails.send({
      // ===================================================================
      // CAMBIO PRINCIPAL AQUÍ
      // Reemplazamos la dirección de prueba por una de tu dominio verificado.
      from: 'Datelia <info@datelia.com.ar>', 
      // ===================================================================
      
      to: ['info@datelia.com.ar'], // El email que recibirá la consulta. Puede ser el mismo o diferente.
      subject: `Nuevo Application D.O.A. de ${body.empresa} (${body.nombre})`,

      // Pasamos los datos al componente de la plantilla del email
      react: ContactEmailTemplate({ 
        nombre: body.nombre,
        cargo: body.cargo,
        email: body.email,
        empresa: body.empresa,
        cantidadEmpleados: body.cantidadEmpleados,
        ecosistema: body.ecosistema,
        desafio: body.desafio,
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