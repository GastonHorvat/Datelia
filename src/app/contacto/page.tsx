import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { ContactForm } from '@/components/contact/contact-form';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contacto | Agenda tu Consultoría Gratuita | Datelia',
  description: 'Contáctanos para una consultoría gratuita en IA y automatización. Descubre cómo podemos optimizar tus procesos y aumentar tu ROI.',
  keywords: 'contacto Datelia, consultoría IA gratuita, agendar demo, contacto automatización',
  openGraph: {
    title: 'Contacto | Datelia',
    description: 'Agenda una consultoría gratuita y descubre cómo la IA puede transformar tu negocio.',
    url: 'https://datelia.tech/contacto',
    type: 'website',
    images: [
      {
        url: '/images/og/og-contacto.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto Datelia - Consultoría Gratuita en IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Datelia',
    description: 'Agenda una consultoría gratuita',
    images: ['/images/og/og-contacto.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.tech/contacto',
  },
};

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Breadcrumbs className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Hablemos de tu Próximo Paso
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-2xl mx-auto mb-8">
            ¿Listo para automatizar y escalar? Completa el formulario y uno de nuestros expertos analizará tu caso para ofrecerte una solución a medida.
          </p>

          <Button asChild size="lg" className="mb-4">
            <a href={siteConfig.links.calendly} target="_blank" rel="noopener noreferrer">
              Agendar Reunión de 30min
            </a>
          </Button>
          <p className="text-sm text-accent-foreground/60">
            ¿Prefieres escribirnos? Usa el formulario a continuación 👇
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}