import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
    ];
  },
};

export default nextConfig;
