import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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
};

export default nextConfig;
