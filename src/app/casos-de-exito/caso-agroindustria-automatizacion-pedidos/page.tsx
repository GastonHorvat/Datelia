import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

// Iconos profesionales de lucide-react
import { TrendingDown, Clock, Target, Zap, Quote } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Agroindustria: +35h Liberadas con Automatización | Caso de Éxito | Datelia',
    description: 'Empresa agroindustrial libera 35 horas semanales digitalizando pedidos, stock y logística. Reducción del 80% en tareas repetitivas y 40% menos errores.',
    keywords: 'caso éxito agroindustria, automatización pedidos agrícola, portal pedidos IA, digitalización agroindustria',
    alternates: {
        canonical: 'https://www.datelia.com.ar/casos-de-exito/caso-agroindustria-automatizacion-pedidos',
    },
};

// Datos del Caso de Éxito
const caseStudy = {
    category: 'Agroindustria',
    title: 'Empresa Agroindustrial Libera 35 Horas Semanales con Pedidos y Logística Automatizados',
    subtitle: 'Digitalización total de pedidos, stock y logística sin cambiar sistemas internos.',
    testimonial: {
        quote: 'Pasamos del caos a tener todo ordenado y automático. Ganamos tiempo real y eliminamos los errores de carga.',
        author: 'Gerente Comercial',
        role: 'Empresa Agroindustrial',
    },
    metrics: [
        { value: '-80%', label: 'Tareas Repetitivas', icon: TrendingDown },
        { value: '+35h', label: 'Horas Liberadas/Semana', icon: Clock },
        { value: '-40%', label: 'Errores por Carga Manual', icon: Target },
        { value: '3×', label: 'Velocidad en Procesamiento', icon: Zap },
    ],
};

const CaseStudyPage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12">
                <div className="container mx-auto px-4 flex flex-col items-center text-center">
                    <Breadcrumbs className="mb-6" />
                    <div className="mb-4">
                        <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                            {caseStudy.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold max-w-4xl mx-auto mb-4">
                        {caseStudy.title}
                    </h1>
                    <p className="text-xl text-accent-foreground/80 max-w-2xl">
                        {caseStudy.subtitle}
                    </p>
                </div>
            </section>

            {/* Métricas Clave */}
            <section className="py-20 sm:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {caseStudy.metrics.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                                <Card key={index} className="text-center">
                                    <CardContent className="pt-6">
                                        <Icon className="mx-auto h-10 w-10 text-primary mb-3" />
                                        <p className="text-3xl md:text-4xl font-bold text-foreground">{metric.value}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Desafío y Solución */}
            <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">El Desafío</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                Los pedidos se gestionaban por WhatsApp, llamadas y planillas dispersas. No había trazabilidad, se cometían errores y ventas, stock y logística trabajaban sin coordinación.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">La Solución Datelia</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                Creamos un portal centralizado de pedidos integrado a stock, logística y administración. Los pedidos se validan automáticamente y los flujos se ordenan sin intervención manual, eliminando tareas repetitivas y errores.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Card className="bg-primary/5 border-l-4 border-primary">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-headline font-bold mb-4">ROI Obtenido</h3>
                            <p className="text-lg text-muted-foreground">
                                Retorno estimado: <strong className="text-foreground">4× en 60 días</strong>, resultado de la reducción del tiempo operativo, menor tasa de errores y un procesamiento más ágil de los pedidos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Testimonio */}
            <section className="py-20 sm:py-24 bg-accent">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Card className="border-l-4 border-primary bg-background p-8">
                        <Quote className="h-8 w-8 text-primary mb-4" />
                        <blockquote className="text-xl md:text-2xl italic text-foreground mb-6">
                            {caseStudy.testimonial.quote}
                        </blockquote>
                        <footer>
                            <p className="text-lg font-semibold text-foreground">{caseStudy.testimonial.author}</p>
                            <p className="text-muted-foreground">{caseStudy.testimonial.role}</p>
                        </footer>
                    </Card>
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-primary text-primary-foreground text-center py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                        ¿Quieres resultados similares para tu negocio?
                    </h2>
                    <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
                        Digitaliza tus procesos sin cambiar tus sistemas. Hablemos de tu proyecto.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contacto">Solicitar una Consultoría</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default CaseStudyPage;
