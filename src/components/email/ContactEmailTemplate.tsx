// src/components/emails/ContactEmailTemplate.tsx

import React from 'react';

interface ContactEmailProps {
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;
  sector: string[];
  mensaje: string;
  howFound: string[];
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
  nombre,
  email,
  telefono,
  empresa,
  sector,
  mensaje,
  howFound,
}) => (
  <div>
    <h1>Nueva consulta desde el formulario de contacto</h1>
    <p><strong>Nombre:</strong> {nombre}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Teléfono:</strong> {telefono}</p>
    <p><strong>Empresa:</strong> {empresa ? empresa : 'No especificada'}</p>
    <p><strong>Sector(es):</strong> {sector.join(', ')}</p>
    <p><strong>Cómo nos encontró:</strong> {howFound.join(', ')}</p>
    <hr />
    <h2>Mensaje:</h2>
    <p>{mensaje}</p>
  </div>
);