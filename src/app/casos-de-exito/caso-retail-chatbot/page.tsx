import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Iconos profesionales de lucide-react
import { TrendingUp, ShieldHalf, Zap, Quote } from 'lucide-react';

// Datos del Caso de Éxito
const caseStudy = {
  client: "UrbanThread", // Usando el nombre inventado para mayor realismo
  logo: "/images/casos/urban-retail.png", // Reemplaza con el logo real
  title: "Empresa de Retail Aumenta su Conversión en un 35% con un Chatbot Inteligente",
  testimonial: {
    quote: "Pasamos de responder en horas a hacerlo en segundos, y nuestras ventas desde WhatsApp aumentaron un 40% en los primeros tres meses. El chatbot se pagó solo.",
    author: "Sofía Castro",
    role: "Gerente de E-commerce, UrbanThread"
  },
  metrics: [
    { value: "+35%", label: "Aumento en Conversión de Leads", icon: TrendingUp },
    { value: "-50%", label: "Reducción en Costos de Soporte", icon: ShieldHalf },
    { value: "6 meses", label: "Retorno de la Inversión (ROI)", icon: Zap }
  ]
};

const CaseStudyRetailPage = () => {
  return (
    <Layout>
      <Head>
        <title>{caseStudy.title} | Casos de Éxito Datelia</title>
        <meta name="description" content={`Descubre cómo ${caseStudy.client} optimizó la captación de leads y redujo costos con un chatbot de Datelia.`} />
      </Head>

      {/* ======================================================================================= */}
      {/* SECCIÓN 1: HERO - EL TITULAR PRINCIPAL                                                 */}
      {/* ======================================================================================= */}
      <section className="bg-accent text-accent-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-center mb-6">
            <Image src={caseStudy.logo} alt={`Logo de ${caseStudy.client}`} width={180} height={50} className="h-24 w-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold max-w-4xl mx-auto">
            {caseStudy.title}
          </h1>
        </div>
      </section>

      {/* ======================================================================================= */}
      {/* SECCIÓN 2: MÉTRICAS CLAVE - RESULTADOS INMEDIATOS                                     */}
      {/* ======================================================================================= */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {caseStudy.metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <Icon className="mx-auto h-12 w-12 text-primary mb-3" />
                    <p className="text-4xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-muted-foreground mt-1">{metric.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================================= */}
      {/* SECCIÓN 3: LA HISTORIA - DESAFÍO Y SOLUCIÓN                                            */}
      {/* ======================================================================================= */}
      <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">El Desafío</h2>
              <p className="text-accent-foreground/80">
                UrbanThread, una marca de retail en pleno crecimiento, se enfrentaba a un volumen masivo de consultas a través de su sitio web y redes sociales. El equipo de soporte no daba abasto, lo que resultaba en tiempos de respuesta lentos y, peor aún, en la pérdida de leads valiosos que llegaban fuera del horario comercial.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">La Solución de Datelia</h2>
              <p className="text-accent-foreground/80">
                Diseñamos e implementamos un chatbot inteligente y multicanal, integrado directamente en su web, WhatsApp e Instagram. El bot fue entrenado para responder el 80% de las preguntas frecuentes (talles, envíos, stock), calificar automáticamente a los nuevos leads según su interés y dirigirlos al agente de ventas adecuado solo cuando fuera necesario.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ======================================================================================= */}
      {/* SECCIÓN 4: TESTIMONIO DEL CLIENTE                                                      */}
      {/* ======================================================================================= */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-l-4 border-primary bg-accent/50 p-8">
            <Quote className="h-8 w-8 text-primary mb-4" />
            <blockquote className="text-xl md:text-2xl italic text-foreground">
              {caseStudy.testimonial.quote}
            </blockquote>
            <footer className="mt-6">
              <p className="text-lg font-semibold text-foreground">{caseStudy.testimonial.author}</p>
              <p className="text-muted-foreground">{caseStudy.testimonial.role}</p>
            </footer>
          </Card>
        </div>
      </section>

      {/* ======================================================================================= */}
      {/* SECCIÓN 5: CTA FINAL - LLAMADA A LA ACCIÓN                                               */}
      {/* ======================================================================================= */}
      <section className="bg-primary text-primary-foreground text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            ¿Quieres resultados similares para tu negocio?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Un chatbot bien implementado no es un costo, es una inversión que se paga sola. Hablemos.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Solicitar una Demo</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyRetailPage;