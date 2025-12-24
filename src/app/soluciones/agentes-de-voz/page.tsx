import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

// Iconos profesionales de lucide-react
import {
  PhoneOff,
  CalendarX2,
  Clock,
  Users,
  CalendarClock,
  TrendingDown,
  UserCheck,
  Spline
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agentes de Voz con IA para Agendar Citas | Datelia',
  description: 'Automatiza agendamiento de citas y gestión telefónica con agentes de voz IA. Reduce no-shows hasta 40% y libera tiempo de tu equipo.',
  keywords: 'agentes de voz IA, automatización llamadas, IVR inteligente, agendamiento automático, bot telefónico',
  openGraph: {
    title: 'Agentes de Voz con IA | Datelia',
    description: 'Automatiza llamadas y reduce no-shows hasta 40% con agentes de voz inteligentes.',
    url: 'https://www.datelia.com.ar/soluciones/agentes-de-voz',
    type: 'website',
    images: [
      {
        url: '/images/og/og-agentes-voz.jpg',
        width: 1200,
        height: 630,
        alt: 'Agentes de Voz con IA - Automatización de Llamadas Telefónicas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentes de Voz con IA | Datelia',
    description: 'Automatiza llamadas y reduce no-shows hasta 40%',
    images: ['/images/og/og-agentes-voz.jpg'],
  },
  alternates: {
    canonical: 'https://www.datelia.com.ar/soluciones/agentes-de-voz',
  },
};

const VoiceAgentsPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Agentes de Voz con Inteligencia Artificial",
    "provider": {
      "@type": "Organization",
      "name": "Datelia",
      "url": "https://www.datelia.com.ar"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Argentina"
    },
    "description": "Agentes telefónicos con IA que gestionan llamadas entrantes y salientes, agendan citas y califican leads con voz humana natural.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "Consultar"
    }
  };

  const problems = [
    { icon: PhoneOff, text: 'Tu personal de recepción pasa horas al teléfono en lugar de atender a los clientes que tiene en frente.' },
    { icon: CalendarX2, text: 'Pierdes ingresos significativos por una alta tasa de "no-shows" (citas no asistidas).' },
    { icon: Clock, text: 'Los clientes se quejan de no poder contactarte fuera del horario de atención para agendar o cancelar.' },
    { icon: Users, text: 'El proceso de confirmación manual de citas es tedioso, consume tiempo y es fácil de olvidar.' },
  ];

  const benefits = [
    { icon: CalendarClock, title: 'Agendamiento 24/7', desc: 'Captura citas incluso de noche o en fin de semana. Tu negocio nunca deja de funcionar.' },
    { icon: TrendingDown, title: 'Reducción Drástica de No-Shows', desc: 'Realiza llamadas y recordatorios proactivos, logrando hasta un 40% menos de ausencias.' },
    { icon: UserCheck, title: 'Libera a tu Equipo Humano', desc: 'Tu personal puede enfocarse en tareas de mayor valor, como la fidelización de clientes.' },
    { icon: Spline, title: 'Sincronización Perfecta', desc: 'Se integra de forma nativa con Google Calendar y otros sistemas para una gestión sin errores.' },
  ];

  const useCases = [
    'Clínicas Médicas y Dentales', 'Talleres Mecánicos', 'Salones de Belleza y Spas',
    'Consultorios Profesionales', 'Inmobiliarias', 'Centros de Fisioterapia', 'y más...'
  ];

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
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Tu Agenda se Llena Sola, por Voz.</h1>
          <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto mb-8">
            Nuestro agente de voz inteligente gestiona, confirma y reagenda citas por teléfono con una voz humana y natural, liberando a tu equipo para siempre.
          </p>
          <Button asChild size="lg">
            <Link href="/contacto">Ver Demo</Link>
          </Button>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">¿Es este el día a día de tu negocio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <Icon className="w-10 h-10 text-primary flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">{problem.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution/Benefits Section */}
      <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-headline font-bold mb-4">Un Asistente que Optimiza tu Tiempo y Dinero</h2>
            <p className="text-lg text-accent-foreground/80">
              Esto no es un contestador automático. Es un miembro más de tu equipo, enfocado 100% en la eficiencia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-background text-foreground p-6 flex gap-6 items-start">
                  <Icon className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-headline font-bold mb-8">Perfecto para negocios que dependen de una agenda</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {useCases.map((useCase) => (
              <Badge key={useCase} variant="secondary" className="text-base px-4 py-2">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <Image
            src="/images/carolinaVitalia.jpg" // Reemplaza con una foto real
            alt="Carolina Méndez, Directora de Operaciones de Clínica Vitalia, cliente satisfecha con agente de voz de Datelia"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-6"
          />
          <blockquote className="text-xl italic mb-6 text-accent-foreground/90">
            "El agente de voz se paga solo. Hemos recuperado unas 15 horas de trabajo administrativo a la semana y las citas olvidadas casi han desaparecido. Increíble."
          </blockquote>
          <p className="text-lg font-semibold">Carolina Méndez</p>
          <p className="text-md text-accent-foreground/70">Directora de Operaciones</p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">¿Quieres escuchar a tu nuevo asistente en acción?</h2>
          <p className="text-lg mb-10 text-primary-foreground/80 max-w-3xl mx-auto">
            Calcula cuánto podrías ahorrar o solicita una llamada de demostración. Verás lo sorprendentemente humano y eficiente que puede sonar el futuro.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contacto">Calcular mi Ahorro</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contacto">Solicitar Llamada de Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VoiceAgentsPage;