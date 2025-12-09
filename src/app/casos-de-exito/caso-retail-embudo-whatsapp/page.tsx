import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TrendingUp, Target, Clock, Quote } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Retail: +45% Cierres con Embudo WhatsApp + CRM | Caso de Éx ito | Datelia',
    description: 'Red comercial aumenta 45% tasa de cierre con embudo unificado WhatsApp + Ads + CRM. 100% trazabilidad del embudo comercial.',
    keywords: 'embudo whatsapp crm, automatización comercial IA, trazabilidad embudo ventas',
    alternates: {
        canonical: 'https://datelia.tech/casos-de-exito/caso-retail-embudo-whatsapp',
    },
};

const caseStudy = {
    category: 'Comercial / Retail',
    title: 'Red Comercial Aumenta un 45% sus Cierres con Embudo Unificado en WhatsApp + Ads + CRM',
    subtitle: 'Automatización completa del flujo comercial, desde el lead hasta el cierre.',
    testimonial: {
        quote: 'Ahora sabemos dónde perdíamos leads y cómo vender más. El cambio fue inmediato en la tasa de cierre.',
        author: 'Gerente Comercial',
        role: 'Red Comercial',
    },
    metrics: [
        { value: '+45%', label: 'Tasa de Cierre', icon: TrendingUp },
        { value: '100%', label: 'Trazabilidad del Embudo', icon: Target },
        { value: '-70%', label: 'Tiempo Operativo Comercial', icon: Clock },
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
                                Los leads de campañas digitales y WhatsApp se gestionaban sin orden ni seguimiento. Se perdían oportunidades y no había trazabilidad del embudo comercial.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">La Solución Datelia</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                Unificamos el embudo completo: WhatsApp + Ads + CRM. La IA clasifica leads, responde consultas, agenda visitas y registra cada interacción, permitiendo medir y optimizar la conversión.
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
                                Retorno estimado: <strong className="text-foreground">6× en 60 días</strong>, impulsado por la mejora inmediata en la tasa de cierre y por el ahorro en tareas operativas del equipo comercial.
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
                    <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">Unifica tu embudo comercial y vende más con IA. Hablemos de tu proyecto.</p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contacto">Solicitar una Consultoría</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default CaseStudyPage;
