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
import { CalendarX2, Clock, HeartHandshake, Quote } from 'lucide-react';

// Datos del Caso de Éxito
const caseStudy = {
  client: "Clínica Vitalia",
  logo: "/images/casos/clinica-vitalia.png", // Reemplaza con el logo real
  title: "Clínica Líder Reduce sus \"No-Shows\" en un 40% con un Agente de Voz IA",
  testimonial: {
    quote: "El agente de voz se paga solo. Hemos recuperado unas 15 horas de trabajo administrativo a la semana y las citas olvidadas casi han desaparecido. Increíble.",
    author: "Laura Herrera",
    role: "Directora de Operaciones, Clínica Vitalia"
  },
  metrics: [
    { value: "-40%", label: "Reducción de Tasa de No-Show", icon: CalendarX2 },
    { value: "+15", label: "Horas Semanales Ahorradas", icon: Clock },
    { value: "+95%", label: "Índice de Satisfacción del Paciente", icon: HeartHandshake }
  ]
};

const CaseStudyClinicaPage = () => {
  return (
    <Layout>
      <Head>
        <title>{caseStudy.title} | Casos de Éxito Datelia</title>
        <meta name="description" content={caseStudy.testimonial.quote} />
      </Head>

      {/* ======================================================================================= */}
      {/* SECCIÓN 1: HERO - EL TITULAR PRINCIPAL                                                 */}
      {/* ======================================================================================= */}
      <section className="bg-accent text-accent-foreground py-28 sm:py-32 text-center">
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
                Clínica Vitalia enfrentaba un problema operativo común pero costoso: una alta tasa de ausencias (no-shows) y un equipo administrativo sobrecargado con la gestión manual de citas. Cada cita perdida era una pérdida directa de ingresos, y el tiempo invertido en llamadas de confirmación impedía al personal atender a los pacientes en la clínica.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">La Solución de Datelia</h2>
              <p className="text-accent-foreground/80">
                Implementamos un Agente de Voz IA avanzado, entrenado para gestionar el ciclo completo de agendamiento. El agente realizaba llamadas de confirmación proactivas, enviaba recordatorios por SMS y permitía a los pacientes reagendar o cancelar su cita 24/7, interactuando de forma natural y eficiente sin intervención humana.
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
            ¿Quieres replicar este éxito en tu negocio?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Hablemos de tus desafíos y de cómo una solución de IA puede transformarlos en resultados.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Agendar una Consultoría</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyClinicaPage;