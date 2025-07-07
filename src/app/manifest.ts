import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Datelia - Soluciones de IA y Automatización para Empresas',
    short_name: 'Datelia',
    description: 'Optimiza tus procesos con IA. En Datelia ofrecemos chatbots inteligentes, agentes de voz y soluciones a medida para potenciar tu negocio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity', 'technology'],
    lang: 'es',
  }
} 