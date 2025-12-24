import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

// Iconos profesionales de lucide-react
import { TrendingDown, Zap, Clock, DollarSign, Quote } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Construcción: Reduce Errores 70% con IA | Caso de Éxito | Datelia',
    description: 'Descubre cómo una empresa de construcción redujo errores operativos en un 70% y aceleró 3× la actualización de datos con IA que interpreta audios y fotos de obra.',
    keywords: 'caso éxito construcción IA, automatización obra construcción, reducir errores construcción, gestión obra inteligente',
    alternates: {
        canonical: 'https://www.datelia.com.ar/casos-de-exito/caso-construccion-reduccion-errores',
    },
};

// Datos del Caso de Éxito
const caseStudy = {
    category: 'Construcción',
    title: 'Empresa de Construcción Reduce Errores en un 70% y Acelera su Operación con IA',
    subtitle: 'Unificación de obra, administración y compras con automatización inteligente.',
    testimonial: {
        quote: 'Hoy tomamos decisiones con total seguridad. La obra está actualizada en minutos y todo el equipo trabaja más alineado.',
        author: 'Director de Operaciones',
        role: 'Empresa de Construcción',
    },
    metrics: [
        { value: '-70%', label: 'Errores Operativos', icon: TrendingDown },
        { value: '+3×', label: 'Velocidad de Actualización', icon: Zap },
        { value: '+20h', label: 'Horas Liberadas/Semana', icon: Clock },
        { value: '90 días', label: 'ROI', icon: DollarSign },
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
                                La empresa trabajaba con cargas manuales, reportes inconsistentes y comunicación fragmentada entre obra y administración. Los avances se informaban por audios y mensajes sueltos, generando errores y falta de claridad para la toma de decisiones críticas.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">La Solución Datelia</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                Implementamos un sistema inteligente que interpreta audios y fotos de obra, actualiza avances automáticamente y sincroniza información con administración y compras. La dirección accede ahora a un panel unificado con costos, avances y desvíos en tiempo real.
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
                                Retorno estimado: <strong className="text-foreground">3× en 90 días</strong>, producto de la reducción de tareas manuales, menor margen de error y un ciclo de obra más eficiente.
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
                        Transforma tu operación con automatización inteligente. Hablemos de tu proyecto.
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
