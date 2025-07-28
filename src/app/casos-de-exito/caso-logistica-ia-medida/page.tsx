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
import { Truck, Crosshair, Zap, Quote } from 'lucide-react';

// Datos del Caso de Éxito
const caseStudy = {
  client: "Nexus Logística",
  logo: "/images/casos/nexus-logistica.png", // Reemplaza con el logo real
  title: "Empresa de Logística Optimiza su Cadena de Suministro con IA a Medida",
  testimonial: {
    quote: "Datelia nos dio la visibilidad que nos faltaba. Ahora no solo reaccionamos a los problemas, los anticipamos. La reducción de costos fue una consecuencia directa de operar de forma más inteligente.",
    author: "Javier Morales",
    role: "Director de Logística, Nexus Logística"
  },
  metrics: [
    { value: "-22%", label: "Reducción de Costos Operativos", icon: Truck },
    { value: "+30%", label: "Precisión en Pronósticos", icon: Crosshair },
    { value: "100%", label: "Automatización de Procesos Clave", icon: Zap }
  ]
};

const CaseStudyLogisticaPage = () => {
  return (
    <Layout>
      <Head>
        <title>{caseStudy.title} | Casos de Éxito Datelia</title>
        <meta name="description" content={`Descubre cómo ${caseStudy.client} redujo costos y optimizó su cadena de suministro con una solución de IA a medida de Datelia.`} />
      </Head>

      {/* ======================================================================================= */}
      {/* SECCIÓN 1: HERO - EL TITULAR PRINCIPAL                                                 */}
      {/* ======================================================================================= */}
      <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4">
          {/* <div className="h-20 flex items-center justify-center mb-6">
            <Image src={caseStudy.logo} alt={`Logo de ${caseStudy.client}`} width={180} height={50} className="h-24 w-auto" />
          </div> */}
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
                Este departamento de logística manejaba una operación compleja con cientos de variables: rutas, inventario, tiempos de entrega y costos de combustible. Su principal problema era la falta de visibilidad en tiempo real, lo que provocaba una reacción tardía a los cuellos de botella, rutas ineficientes y costos operativos impredecibles.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">La Solución de Datelia</h2>
              <p className="text-accent-foreground/80">
                Desarrollamos una solución de IA totalmente a medida que se integró con sus sistemas existentes. El modelo analiza datos históricos y en tiempo real para predecir con alta precisión posibles demoras, optimizar las rutas de entrega dinámicamente y automatizar la asignación de recursos, transformando su operación de reactiva a proactiva.
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
            ¿Tu desafío no encaja en un molde?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Las soluciones más potentes son las que se diseñan para un problema específico. Contáctanos y creemos juntos la tuya.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Desarrollar una Solución a Medida</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyLogisticaPage;