// src/components/emails/ContactEmailTemplate.tsx

import React from 'react';

interface ContactEmailProps {
  nombre: string;
  email: string;
  telefono: string;
  website?: string;
  empresa?: string;
  cantidadEmpleados: string;
  sector: string[];
  mensaje: string;
  howFound: string[];
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
  nombre,
  email,
  telefono,
  website,
  empresa,
  cantidadEmpleados,
  sector,
  mensaje,
  howFound,
}) => (
  <div>
    <h1>Nueva consulta desde el formulario de contacto</h1>
    <p><strong>Nombre:</strong> {nombre}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Teléfono:</strong> {telefono}</p>
    <p><strong>Website:</strong> {website ? website : 'No especificado'}</p>
    <p><strong>Empresa:</strong> {empresa ? empresa : 'No especificada'}</p>
    <p><strong>Cantidad de empleados:</strong> {cantidadEmpleados}</p>
    <p><strong>Sector(es):</strong> {sector.join(', ')}</p>
    <p><strong>Cómo nos encontró:</strong> {howFound.join(', ')}</p>
    <hr />
    <h2>Mensaje:</h2>
    <p>{mensaje}</p>
  </div>
);