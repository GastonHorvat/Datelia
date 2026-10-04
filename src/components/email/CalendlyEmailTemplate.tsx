// src/components/email/CalendlyEmailTemplate.tsx

import React from 'react';

interface CalendlyEmailProps {
  nombre: string;
  email: string;
  tituloEvento: string;
  fecha: string;
  crmStatus: 'created' | 'failed';
  crmUrl?: string;
}

export const CalendlyEmailTemplate: React.FC<Readonly<CalendlyEmailProps>> = ({
  nombre,
  email,
  tituloEvento,
  fecha,
  crmStatus,
  crmUrl,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
    <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Nueva reunión agendada: {nombre}</h1>

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
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Agendó:</strong> {tituloEvento}</p>
    <p><strong>Cuándo:</strong> {fecha}</p>
  </div>
);
