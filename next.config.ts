import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Objeto 2: El que necesitas añadir para las imágenes de tu blog
      {
        protocol: 'https',
        hostname: 'juhmwanicmpjvyakrjbg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/blog-assets/**',
      },
    ],
  },
  async redirects() {
    return [

      // Redirects de páginas legales antiguas a /legal/
      {
        source: '/politica-de-privacidad',
        destination: '/legal/politica-de-privacidad',
        permanent: true,
      },
      {
        source: '/terminos-y-condiciones',
        destination: '/legal/terminos-y-condiciones',
        permanent: true,
      },
      {
        source: '/politica-de-cookies',
        destination: '/legal/politica-de-cookies',
        permanent: true,
      },

      // Baja de la capacitación CCEE (terminada) - 301 a home, en los 3 idiomas
      {
        source: '/ccee',
        destination: '/',
        permanent: true,
      },
      {
        source: '/CCEE',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/ccee',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/pt/ccee',
        destination: '/pt',
        permanent: true,
      },

      // Rediseño de contenido (2026-10-04): casos de éxito inventados -> /casos real,
      // en los 3 idiomas. :path* cubre tanto el listado como las 9 páginas de detalle viejas.
      {
        source: '/casos-de-exito',
        destination: '/casos',
        permanent: true,
      },
      {
        source: '/casos-de-exito/:path*',
        destination: '/casos',
        permanent: true,
      },
      {
        source: '/en/casos-de-exito',
        destination: '/en/casos',
        permanent: true,
      },
      {
        source: '/en/casos-de-exito/:path*',
        destination: '/en/casos',
        permanent: true,
      },
      {
        source: '/pt/casos-de-exito',
        destination: '/pt/casos',
        permanent: true,
      },
      {
        source: '/pt/casos-de-exito/:path*',
        destination: '/pt/casos',
        permanent: true,
      },

      // Agentes de Voz: sin casos reales de respaldo, se da de baja (los 3 idiomas)
      {
        source: '/soluciones/agentes-de-voz',
        destination: '/soluciones',
        permanent: true,
      },
      {
        source: '/en/soluciones/agentes-de-voz',
        destination: '/en/soluciones',
        permanent: true,
      },
      {
        source: '/pt/soluciones/agentes-de-voz',
        destination: '/pt/soluciones',
        permanent: true,
      },

      // Chatbots Inteligentes -> Pedidos y presupuestos (mismo contenido, nuevo enfoque)
      {
        source: '/soluciones/chatbots-inteligentes',
        destination: '/soluciones/pedidos-y-presupuestos',
        permanent: true,
      },
      {
        source: '/en/soluciones/chatbots-inteligentes',
        destination: '/en/soluciones/pedidos-y-presupuestos',
        permanent: true,
      },
      {
        source: '/pt/soluciones/chatbots-inteligentes',
        destination: '/pt/soluciones/pedidos-y-presupuestos',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
