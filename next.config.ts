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
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.datelia.tech' }],
        destination: 'https://datelia.tech/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
