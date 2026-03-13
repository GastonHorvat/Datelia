// src/components/emails/ContactEmailTemplate.tsx

import React from 'react';

interface ContactEmailProps {
  nombre: string;
  cargo: string;
  email: string;
  empresa: string;
  cantidadEmpleados: string;
  ecosistema: string;
  desafio: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
  nombre,
  cargo,
  email,
  empresa,
  cantidadEmpleados,
  ecosistema,
  desafio,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
    <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Nueva Aplicación D.O.A.™: {empresa}</h1>
    
    <h2>1. Dimensión Operativa</h2>
    <p><strong>Empresa:</strong> {empresa}</p>
    <p><strong>Volumen Humano:</strong> {cantidadEmpleados}</p>

    <h2>2. Deuda Operativa</h2>
    <p><strong>Ecosistema Principal Activo:</strong> {ecosistema}</p>
    <p><strong>Desafío Estructural (Fricción):</strong></p>
    <blockquote style={{ background: '#f9f9f9', padding: '15px', borderLeft: '4px solid #ccc', margin: '10px 0' }}>
      {desafio}
    </blockquote>
    
    <h2>3. Datos del C-Level / Director</h2>
    <p><strong>Nombre:</strong> {nombre}</p>
    <p><strong>Cargo:</strong> {cargo}</p>
    <p><strong>Email Corporativo:</strong> {email}</p>
  </div>
);