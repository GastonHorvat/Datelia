import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const {
      nombre,
      email,
      telefono,
      empresa,
      sector, // This should be an array of selected sectors
      mensaje,
      comoNosEncontro, // This should be an array of selected options
    } = formData;

    // Basic validation (you can add more detailed validation as needed)
    if (!nombre || !email || !telefono || !sector || sector.length === 0 || !mensaje) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Format the email body
    const emailBody = `
Asunto: Nuevo Lead desde la Página de Contacto - Datelia

Has recibido una nueva consulta desde la web.

--- DATOS DEL CONTACTO ---

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Empresa: ${empresa || 'No especificado'}

--- DETALLES DE LA CONSULTA ---

Sector(es): ${sector.join(', ') || 'No especificado'}
Mensaje:
${mensaje}

--- INFORMACIÓN ADICIONAL ---

Cómo nos encontró: ${comoNosEncontro?.join(', ') || 'No especificado'}
    `;

    // Placeholder for sending the email
    // Replace this with your actual email sending logic
    // Example using a hypothetical sendEmail function:
    /*
    const emailSent = await sendEmail({
      to: 'info@datelia.tech',
      subject: 'Nuevo Lead desde la Página de Contacto - Datelia',
      text: emailBody,
    });

    if (!emailSent) {
      return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
    */

    // For now, we'll just return a success message
    console.log('Email would be sent with body:', emailBody); // Log the email body for debugging

    return NextResponse.json({ message: 'Message received successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// You would need to implement or import a sendEmail function here
// based on your chosen email sending library or service.
// Example placeholder function:
/*
async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }): Promise<boolean> {
  // Implement your email sending logic here (e.g., using Nodemailer, SendGrid, etc.)
  // This is a placeholder and will not actually send an email.
  console.log(`Attempting to send email to ${to} with subject: ${subject}`);
  console.log('Email body:', text);
  // Simulate success
  return true;
}
*/