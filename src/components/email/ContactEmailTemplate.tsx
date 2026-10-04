// src/components/emails/ContactEmailTemplate.tsx

import React from 'react';

interface ContactEmailProps {
  nombre: string;
  empresa: string;
  contacto: string;
  tarea: string;
  crmStatus: 'created' | 'failed';
  crmUrl?: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
  nombre,
  empresa,
  contacto,
  tarea,
  crmStatus,
  crmUrl,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
    <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Nueva consulta: {empresa}</h1>

    {crmStatus === 'created' ? (
      <p style={{ background: '#e6f4ea', color: '#1e7e34', padding: '10px 15px', borderRadius: '6px' }}>
        ✅ Cargado en el CRM de Odoo.{' '}
        {crmUrl && (
          <a href={crmUrl} style={{ color: '#1e7e34', fontWeight: 'bold' }}>
            Ver en Odoo →
          </a>
        )}
      </p>
    ) : (
      <p style={{ background: '#fdecea', color: '#a61b1b', padding: '10px 15px', borderRadius: '6px' }}>
        ⚠️ No se pudo cargar automáticamente en el CRM. Cargarlo a mano en Odoo para no perderlo.
      </p>
    )}

    <p><strong>Nombre:</strong> {nombre}</p>
    <p><strong>Empresa:</strong> {empresa}</p>
    <p><strong>Email o WhatsApp:</strong> {contacto}</p>

    <p><strong>¿Qué tarea le gustaría dejar de hacer a mano?</strong></p>
    <blockquote style={{ background: '#f9f9f9', padding: '15px', borderLeft: '4px solid #ccc', margin: '10px 0' }}>
      {tarea}
    </blockquote>
  </div>
);
