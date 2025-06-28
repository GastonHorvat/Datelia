import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
    {
      logo: '/placeholders/logo-empresa-retail.svg',
      title: 'Empresa de Retail Aumenta su Conversión en un 35% con un Chatbot Inteligente',
      summary: 'Implementamos un chatbot multicanal que no solo automatizó el 80% de las consultas de soporte, sino que también optimizó la captación y calificación de leads 24/7.',
      metrics: ['+35% Conversión de Leads', '-50% en Costos de Soporte', 'ROI en 6 meses'],
      href: '/casos-de-exito/caso-retail-chatbot',
    },
    {
      logo: '/placeholders/logo-clinica-salud.svg',
      title: 'Clínica Líder Reduce sus "No-Shows" en un 40% con un Agente de Voz IA',
      summary: 'Nuestro agente de voz se encargó de la confirmación proactiva de citas, liberando 15 horas semanales del personal administrativo y recuperando ingresos perdidos.',
      metrics: ['-40% Tasa de No-Show', '+15 Horas/Semana Ahorradas', '+95% Satisfacción'],
      href: '/casos-de-exito/caso-clinica-agente-voz',
    },
    {
      logo: '/placeholders/logo-empresa-logistica.svg',
      title: 'Empresa de Logística Optimiza su Cadena de Suministro con IA a Medida',
      summary: 'Desarrollamos una solución personalizada que analiza datos en tiempo real para predecir cuellos de botella, optimizando rutas y reduciendo los costos operativos en un 22%.',
      metrics: ['-22% Costos Operativos', '+30% Precisión', 'Proceso Automatizado'],
      href: '/casos-de-exito/caso-logistica-ia-medida',
    },
  ];

const CaseStudiesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Casos de Éxito en IA y Automatización | Datelia</title>
        <meta name="description" content="Descubre los resultados reales que hemos generado para nuestros clientes. Casos de estudio con métricas de ROI, eficiencia y crecimiento impulsados por IA." />
      </Head>

      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Resultados Reales, No Promesas.
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto">
            Descubre cómo hemos transformado negocios como el tuyo, implementando soluciones de IA
            que generan un impacto medible y un ROI tangible.
          </p>
        </div>
      </section>

      {/* Case Studies Gallery */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-headline font-bold mb-4">La Evidencia de Nuestro Trabajo</h2>
            <p className="text-lg text-muted-foreground">
              Cada caso representa un desafío superado y una meta alcanzada, subrayando nuestro compromiso con los resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Link href={caseStudy.href} key={caseStudy.title} className="block group h-full">
                <Card className="h-full flex flex-col hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="h-16 flex items-center justify-center mb-4">
                       <Image
                          src={caseStudy.logo}
                          alt={`Logo de cliente de Datelia`}
                          width={140}
                          height={40}
                          className="h-10 w-auto object-contain"
                        />
                    </div>
                    <CardTitle className="text-xl leading-snug">{caseStudy.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{caseStudy.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center font-semibold text-primary">
                      <span>Leer Caso de Éxito</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Ahora, imagina estos resultados en tu empresa.
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            El próximo caso de éxito podría ser el tuyo. Si estás listo para empezar a implementar, hablemos.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Hablemos de tu Proyecto</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudiesPage;