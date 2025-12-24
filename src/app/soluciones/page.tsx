import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ProblemVsSolutionSection } from '@/components/solutions/problem-vs-solution';
import { CtaSection } from '@/components/landing/cta-section';

// Iconos profesionales de lucide-react
import { Bot, Mic, Wrench, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Soluciones de IA y Automatización | Chatbots y Agentes de Voz | Datelia',
  description: 'Descubre nuestras soluciones de IA: chatbots inteligentes, agentes de voz y automatización a medida. Optimiza procesos y aumenta tu ROI hasta 40%.',
  keywords: 'soluciones IA, chatbots empresariales, agentes de voz, automatización empresarial, IA a medida',
  openGraph: {
    title: 'Soluciones de IA y Automatización | Datelia',
    description: 'Chatbots 24/7, agentes de voz y automatización a medida para empresas.',
    url: 'https://datelia.com.ar/soluciones',
    type: 'website',
    images: [
      {
        url: '/images/og/og-soluciones.jpg',
        width: 1200,
        height: 630,
        alt: 'Soluciones de IA - Chatbots, Agentes de Voz y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluciones de IA y Automatización | Datelia',
    description: 'Chatbots, agentes de voz y automatización empresarial',
    images: ['/images/og/og-soluciones.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.com.ar/soluciones',
  },
};

const solutions = [
  {
    icon: Bot,
    title: 'Chatbots Inteligentes Multicanal',
    description: 'Transforma tu atención al cliente y tu proceso de ventas. Implementamos chatbots en WhatsApp, Web e Instagram que operan 24/7, capturando leads y resolviendo dudas para que tu equipo se enfoque en cerrar tratos.',
    benefits: [
      'Aumento de la captación de leads.',
      'Disponibilidad 24/7.',
      'Reducción de costos de soporte.',
    ],
    href: '/soluciones/chatbots-inteligentes',
    cta: 'Descubrir Solución de Chatbots',
  },
  {
    icon: Mic,
    title: 'Agentes de Voz para Agendamiento',
    description: 'Elimina la carga del agendamiento telefónico. Nuestro agente de voz con IA gestiona, confirma y reagenda citas con una voz natural y humana, integrándose perfectamente con tu calendario.',
    benefits: [
      'Ahorro de horas administrativas.',
      'Reducción drástica de no-shows.',
      'Mejora de la experiencia del cliente.',
    ],
    href: '/soluciones/agentes-de-voz',
    cta: 'Descubrir Agentes de Voz',
  },
  {
    icon: Wrench,
    title: 'Soluciones de IA a Medida',
    description: '¿Tu desafío no encaja en un molde? Perfecto. Nuestro lema es "implementar resultados", y eso a menudo significa construir algo único. Analizamos tus procesos y desarrollamos una solución personalizada.',
    benefits: [
      'Solución 100% adaptada a tu negocio.',
      'Optimización de procesos únicos.',
      'Máximo impacto en el ROI.',
    ],
    href: '/contacto',
    cta: 'Contactar para un Análisis',
  },
];

const SolutionsPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Soluciones de Inteligencia Artificial para Empresas",
    "provider": {
      "@type": "Organization",
      "name": "Datelia",
      "url": "https://datelia.com.ar"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Argentina"
    },
    "description": "Consultoría y desarrollo de soluciones de IA a medida, incluyendo chatbots, agentes de voz y automatización de procesos para empresas.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "Consultar"
    }
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Breadcrumbs className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Soluciones de IA que Impulsan tu Negocio
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto">
            Más allá de la tecnología, creamos soluciones que resuelven problemas reales. Nuestro enfoque es simple: entender tu desafío y aplicar la IA correcta para generar eficiencia, crecimiento y un ROI medible.
          </p>
        </div>
      </section>

      {/* Solutions Presentation Sections */}
      {solutions.map((solution, index) => {
        const Icon = solution.icon;
        return (
          <section key={index} className={`py-20 sm:py-24 ${index % 2 === 0 ? 'bg-background text-foreground' : 'bg-accent text-accent-foreground'}`}>
            <div className="container mx-auto px-4">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`flex justify-center ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <Icon className="w-32 h-32 md:w-48 md:h-48 text-primary" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-headline font-bold">
                    {solution.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {solution.description}
                  </p>
                  <div className="space-y-3">
                    {solution.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-4">
                    <Link href={solution.href}>{solution.cta} →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Problem vs Solution Section */}
      <ProblemVsSolutionSection />

      {/* Final CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default SolutionsPage;