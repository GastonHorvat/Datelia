import type { Metadata, Viewport } from 'next'; // 1. Importa Viewport
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// 2. El objeto metadata ya NO contiene la clave 'viewport'
export const metadata: Metadata = {
  title: 'Datelia | Soluciones de IA y Automatización para Empresas',
  description: 'Optimiza tus procesos con IA. En Datelia ofrecemos chatbots inteligentes, agentes de voz y soluciones a medida para potenciar tu negocio. ¡Solicita una demo!',
  keywords: 'IA, inteligencia artificial, automatización, chatbots, agentes de voz, empresas, ROI, eficiencia',
  authors: [{ name: 'Datelia' }],
  creator: 'Datelia',
  publisher: 'Datelia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://datelia.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Datelia | Soluciones de IA y Automatización para Empresas',
    description: 'Optimiza tus procesos con IA. En Datelia ofrecemos chatbots inteligentes, agentes de voz y soluciones a medida para potenciar tu negocio.',
    url: 'https://datelia.tech',
    siteName: 'Datelia',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Datelia - Soluciones de IA y Automatización para Empresas',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Datelia | Soluciones de IA y Automatización para Empresas',
    description: 'Optimiza tus procesos con IA. En Datelia ofrecemos chatbots inteligentes, agentes de voz y soluciones a medida para potenciar tu negocio.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Reemplazar con el código real
    // yandex: 'your-yandex-verification-code', // Si necesitas Yandex
    // bing: 'your-bing-verification-code', // Si necesitas Bing
  },
  // La clave 'viewport' ha sido eliminada de aquí.
};

// 3. Se exporta el viewport como una constante separada
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Nota: Next.js gestiona las fuentes de Google de forma optimizada.
            Considera usar next/font para un mejor rendimiento en el futuro.
            Por ahora, esto funciona bien. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Datelia",
              "description": "Soluciones de IA y Automatización para Empresas",
              "url": "https://datelia.tech",
              "logo": "https://datelia.tech/images/logo.png",
              "sameAs": [
                "https://linkedin.com/company/datelia",
                "https://twitter.com/datelia"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34-XXX-XXX-XXX",
                "contactType": "customer service",
                "areaServed": "ES",
                "availableLanguage": "Spanish"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ES"
              },
              "service": [
                {
                  "@type": "Service",
                  "name": "Chatbots Inteligentes",
                  "description": "Automatización de atención al cliente con chatbots inteligentes para WhatsApp, Web e Instagram"
                },
                {
                  "@type": "Service",
                  "name": "Agentes de Voz",
                  "description": "Agentes de voz con IA para agendamiento automático de citas y gestión telefónica"
                },
                {
                  "@type": "Service",
                  "name": "Soluciones de IA a Medida",
                  "description": "Desarrollo de soluciones personalizadas de inteligencia artificial para empresas"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}