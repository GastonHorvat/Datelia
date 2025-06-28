import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';

// Iconos profesionales de lucide-react
import { Bot, Mic, Wrench, CheckCircle2 } from 'lucide-react';

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
  return (
    <Layout>
      <Head>
        <title>Soluciones de IA y Automatización para Empresas | Datelia</title>
        <meta name="description" content="Descubre nuestras soluciones de IA: Chatbots inteligentes, agentes de voz para agendamiento y desarrollos a medida para transformar tu negocio." />
      </Head>

      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground py-24 text-center">
        <div className="container mx-auto px-4">
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
          <section key={index} className={`py-20 sm:py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-accent'}`}>
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

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            ¿No estás seguro por dónde empezar?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/80">
            No te preocupes. El primer paso es una conversación. Hablemos de tus objetivos y te ayudaremos a identificar la solución que generará el mayor impacto para tu negocio.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Agendar una Consultoría Gratuita</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsPage;