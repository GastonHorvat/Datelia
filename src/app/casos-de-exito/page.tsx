import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight } from 'lucide-react';
import { SectorsSection } from '@/components/case-studies/sectors-section';
import { CtaSection } from '@/components/landing/cta-section';

export const metadata: Metadata = {
  title: 'Casos de Éxito en IA y Automatización | Resultados Reales | Datelia',
  description: 'Descubre resultados reales: +35% conversión, -40% no-shows, -22% costos operativos. Casos de éxito con métricas de ROI verificables en IA y automatización empresarial.',
  keywords: 'casos de éxito IA, ROI automatización, testimonios chatbots, resultados IA empresas, casos de estudio automatización',
  openGraph: {
    title: 'Casos de Éxito en IA y Automatización | Datelia',
    description: 'Resultados reales verificables: +35% conversión, -40% no-shows, -22% costos operativos con soluciones de IA.',
    url: 'https://datelia.com.ar/casos-de-exito',
    type: 'website',
    images: [
      {
        url: '/images/og/og-casos-exito.jpg',
        width: 1200,
        height: 630,
        alt: 'Casos de Éxito - Resultados Reales con IA y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casos de Éxito en IA y Automatización | Datelia',
    description: 'Resultados reales verificables con soluciones de IA',
    images: ['/images/og/og-casos-exito.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.com.ar/casos-de-exito',
  },
};

const caseStudies = [
  // Casos existentes
  {
    category: 'Retail',
    title: 'Empresa de Retail Aumenta su Conversión en un 35% con un Chatbot Inteligente',
    summary: 'Implementamos un chatbot multicanal que no solo automatizó el 80% de las consultas de soporte, sino que también optimizó la captación y calificación de leads 24/7.',
    metrics: ['+35% Conversión de Leads', '-50% en Costos de Soporte', 'ROI en 6 meses'],
    href: '/casos-de-exito/caso-retail-chatbot',
  },
  {
    category: 'Salud',
    title: 'Clínica Líder Reduce sus "No-Shows" en un 40% con un Agente de Voz IA',
    summary: 'Nuestro agente de voz se encargó de la confirmación proactiva de citas, liberando 15 horas semanales del personal administrativo y recuperando ingresos perdidos.',
    metrics: ['-40% Tasa de No-Show', '+15 Horas/Semana Ahorradas', '+95% Satisfacción'],
    href: '/casos-de-exito/caso-clinica-agente-voz',
  },
  {
    category: 'Logística',
    title: 'Empresa de Logística Optimiza su Cadena de Suministro con IA a Medida',
    summary: 'Desarrollamos una solución personalizada que analiza datos en tiempo real para predecir cuellos de botella, optimizando rutas y reduciendo los costos operativos en un 22%.',
    metrics: ['-22% Costos Operativos', '+30% Precisión', 'Proceso Automatizado'],
    href: '/casos-de-exito/caso-logistica-ia-medida',
  },
  // Nuevos casos
  {
    category: 'Construcción',
    title: 'Empresa de Construcción Reduce Errores en un 70% y Acelera su Operación con IA',
    summary: 'Unificación de obra, administración y compras con automatización inteligente. Desarrollamos un ecosistema que integra obra y administración: la IA interpreta audios y fotos de jefes de obra, sincroniza avances y actualiza costos sin carga manual.',
    metrics: ['-70% Errores Operativos', '+3× Velocidad de Actualización', '+20 h/semana liberadas', 'ROI en 90 días'],
    href: '/casos-de-exito/caso-construccion-reduccion-errores',
  },
  {
    category: 'Agroindustria',
    title: 'Empresa Agroindustrial Libera 35 Horas Semanales con Pedidos y Logística Automatizados',
    summary: 'Digitalización total de pedidos, stock y logística sin cambiar sistemas internos. Implementamos un portal inteligente que procesa pedidos, valida stock, centraliza logística y elimina el uso de WhatsApp y planillas.',
    metrics: ['-80% Tareas Repetitivas', '+35 h/semana liberadas', '-40% Errores por Carga Manual', '3× Velocidad en Procesamiento'],
    href: '/casos-de-exito/caso-agroindustria-automatizacion-pedidos',
  },
  {
    category: 'Servicios',
    title: 'Empresa de Servicios Reduce Reclamos en un 60% con un Chatbot Inteligente de Postventa',
    summary: 'Automatización de consultas, derivaciones y estado del servicio en tiempo real. Creamos un asistente IA multicanal que responde FAQs, informa estado de servicio, gestiona reclamos y deriva casos complejos a agentes humanos.',
    metrics: ['-60% Reclamos al Call Center', '+80% Consultas en <30s', '-50% Costo Operativo'],
    href: '/casos-de-exito/caso-servicios-chatbot-postventa',
  },
  {
    category: 'Manufactura',
    title: 'Industria Manufacturera Reduce Stock de Seguridad un 30% con IA Predictiva',
    summary: 'Sistema de compras inteligente basado en demanda real. Implementamos un motor de demanda predictiva que convierte ventas reales en órdenes de compra automáticas. La empresa redujo costos, evitó sobrestock y ganó precisión.',
    metrics: ['-30% Stock de Seguridad', '-25% inmovilización de capital', '+20% Precisión de Compras'],
    href: '/casos-de-exito/caso-manufactura-ia-predictiva',
  },
  {
    category: 'Comercial',
    title: 'Red Comercial Aumenta un 45% sus Cierres con Embudo Unificado en WhatsApp + Ads + CRM',
    summary: 'Automatización completa del flujo comercial, desde el lead hasta el cierre. El bot IA clasifica leads, responde consultas, agenda visitas y sincroniza todo con CRM, unificando canales y aportando trazabilidad total del embudo.',
    metrics: ['+45% Tasa de Cierre', '100% Trazabilidad del Embudo', '-70% Tiempo Operativo Comercial'],
    href: '/casos-de-exito/caso-retail-embudo-whatsapp',
  },
  {
    category: 'Logística',
    title: 'Empresa de Logística Elimina Excel y Centraliza su Operación con un Panel 360°',
    summary: 'Decisiones en tiempo real con datos unificados de pedidos, stock y despacho. Creamos un centro de mando que integra pedidos, rutas, inventario y entregas. La empresa dejó atrás procesos manuales y ganó eficiencia y claridad operativa desde el día cero.',
    metrics: ['-85% Tiempo en Reportes', '+35% Eficiencia Operativa', '-20% Costos Logísticos'],
    href: '/casos-de-exito/caso-logistica-panel-360',
  },
];

const CaseStudiesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Breadcrumbs className="mb-6" />
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
                  <CardHeader className="pb-4">
                    <Badge variant="outline" className="w-fit mb-2">{caseStudy.category}</Badge>
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

      {/* Sectors Section */}
      <SectorsSection />

      {/* Final CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default CaseStudiesPage;