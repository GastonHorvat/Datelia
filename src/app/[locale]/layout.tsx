import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { poppins } from '../fonts';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Datelia' }],
    creator: 'Datelia',
    publisher: 'Datelia',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.datelia.com.ar'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://www.datelia.com.ar',
      siteName: 'Datelia',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: locale === 'pt' ? 'pt_BR' : locale === 'en' ? 'en_US' : 'es_AR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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
      google: 'ytpBBxLlyBINteEE8kcqhq8Z_floIVvKeJvTcdasUNQ',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Datelia",
              "description": "Soluciones de IA y Automatización para Empresas",
              "url": "https://www.datelia.com.ar",
              "logo": "https://www.datelia.com.ar/images/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/datelia/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54-387-585-8088",
                "contactType": "customer service",
                "areaServed": "AR",
                "availableLanguage": ["Spanish", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Buenos Aires",
                "addressCountry": "AR"
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
      <body className={`${poppins.variable} font-body antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {props.children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}