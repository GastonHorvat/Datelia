// src/components/emails/ContactEmailTemplate.tsx

import React from 'react';

interface ContactEmailProps {
  nombre: string;
  empresa: string;
  contacto: string;
  tarea: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
  nombre,
  empresa,
  contacto,
  tarea,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
    <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Nueva consulta: {empresa}</h1>

    <p><strong>Nombre:</strong> {nombre}</p>
    <p><strong>Empresa:</strong> {empresa}</p>
    <p><strong>Email o WhatsApp:</strong> {contacto}</p>

    <p><strong>¿Qué tarea le gustaría dejar de hacer a mano?</strong></p>
    <blockquote style={{ background: '#f9f9f9', padding: '15px', borderLeft: '4px solid #ccc', margin: '10px 0' }}>
      {tarea}
    </blockquote>
  </div>
);
