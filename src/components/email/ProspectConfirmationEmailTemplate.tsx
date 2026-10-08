// src/components/email/ProspectConfirmationEmailTemplate.tsx

import React from 'react';
import { siteConfig } from '@/config/site';

interface ProspectConfirmationEmailProps {
  nombre: string;
}

export const ProspectConfirmationEmailTemplate: React.FC<Readonly<ProspectConfirmationEmailProps>> = ({
  nombre,
}) => {
  const whatsappHref = `https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`;

  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px', fontWeight: '600' }}>
        Hola {nombre},
      </h1>

      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        Recibimos tu mensaje. Nos encantó saber qué tarea te gustaría dejar de hacer a mano.
      </p>

      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        Nuestro equipo lo está leyendo ahora. Te escribimos en las próximas 48 horas hábiles con una propuesta o para agendar una charla sin costo.
      </p>

      <div style={{
        background: '#f0f9ff',
        padding: '16px',
        borderRadius: '8px',
        borderLeft: '4px solid #0284c7',
        marginBottom: '24px'
      }}>
        <p style={{ fontSize: '14px', margin: '0' }}>
          <strong>¿Querés agilizar?</strong> Escribinos por <a href={whatsappHref} style={{ color: '#0284c7', textDecoration: 'none' }}>WhatsApp</a> si es urgente.
        </p>
      </div>

      <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
        Un saludo,
      </p>
      <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
        El equipo de Datelia
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
        Datelia · Automatización administrativa para empresas
        <br />
        datelia.com.ar
      </p>
    </div>
  );
};
