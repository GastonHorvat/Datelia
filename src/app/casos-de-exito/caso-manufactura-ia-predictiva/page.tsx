import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TrendingDown, DollarSign, Target, Quote } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Manufactura: -30% Stock con IA Predictiva | Caso de Éxito | Datelia',
    description: 'Industria manufacturera reduce 30% stock de seguridad con IA predictiva de demanda. 25% menos capital inmovilizado y 20% más precisión en compras.',
    keywords: 'IA predictiva manufactura, optimización stock IA, demanda predictiva industria',
    alternates: {
        canonical: 'https://datelia.tech/casos-de-exito/caso-manufactura-ia-predictiva',
    },
};

const caseStudy = {
    category: 'Manufactura',
    title: 'Industria Manufacturera Reduce Stock de Seguridad un 30% con IA Predictiva',
    subtitle: 'Sistema de compras inteligente basado en demanda real.',
    testimonial: {
        quote: 'Nunca hubo tanta claridad para comprar. Redujimos costos sin riesgos y mejoramos la eficiencia financiera.',
        author: 'Director de Compras',
        role: 'Industria Manufacturera',
    },
    metrics: [
        { value: '-30%', label: 'Stock de Seguridad', icon: TrendingDown },
        { value: '-25%', label: 'Inmovilización de Capital', icon: DollarSign },
        { value: '+20%', label: 'Precisión de Compras', icon: Target },
    ],
};

const CaseStudyPage = () => {
    return (
        <Layout>
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12">
                <div className="container mx-auto px-4 flex flex-col items-center text-center">
                    <Breadcrumbs className="mb-6" />
                    <div className="mb-4">
                        <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{caseStudy.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold max-w-4xl mx-auto mb-4">{caseStudy.title}</h1>
                    <p className="text-xl text-accent-foreground/80 max-w-2xl">{caseStudy.subtitle}</p>
                </div>
            </section>

            <section className="py-20 sm:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

            <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">El Desafío</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                La empresa realizaba compras sin previsión, acumulando stock innecesario y generando altos costos financieros. Faltaba una visión clara de consumo y planificación.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">La Solución Datelia</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                Desarrollamos un modelo de IA que predice demanda, analiza estacionalidad y genera órdenes de compra automáticas. Esto redujo sobrestock, evitó roturas de stock y mejoró la eficiencia en abastecimiento.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Card className="bg-primary/5 border-l-4 border-primary">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-headline font-bold mb-4">ROI Obtenido</h3>
                            <p className="text-lg text-muted-foreground">
                                Retorno estimado: <strong className="text-foreground">5× en 120 días</strong>, por la reducción del stock de seguridad, la liberación de capital y la optimización de compras.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="py-20 sm:py-24 bg-accent">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Card className="border-l-4 border-primary bg-background p-8">
                        <Quote className="h-8 w-8 text-primary mb-4" />
                        <blockquote className="text-xl md:text-2xl italic text-foreground mb-6">{caseStudy.testimonial.quote}</blockquote>
                        <footer>
                            <p className="text-lg font-semibold text-foreground">{caseStudy.testimonial.author}</p>
                            <p className="text-muted-foreground">{caseStudy.testimonial.role}</p>
                        </footer>
                    </Card>
                </div>
            </section>

            <section className="bg-primary text-primary-foreground text-center py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">¿Quieres resultados similares para tu negocio?</h2>
                    <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">Optimiza tu cadena de suministro con inteligencia predictiva. Hablemos de tu proyecto.</p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contacto">Solicitar una Consultoría</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default CaseStudyPage;
