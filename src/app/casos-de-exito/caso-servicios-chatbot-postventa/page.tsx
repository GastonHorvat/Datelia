import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TrendingDown, Zap, DollarSign, Quote } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Servicios: -60% Reclamos con Chatbot IA | Caso de Éxito | Datelia',
    description: 'Empresa de servicios reduce reclamos 60% con chatbot IA de postventa 24/7. 80% de consultas resueltas en menos de 30 segundos.',
    keywords: 'chatbot postventa servicios, automatización soporte IA, reducir reclamos chatbot',
    alternates: {
        canonical: 'https://datelia.com.ar/casos-de-exito/caso-servicios-chatbot-postventa',
    },
};

const caseStudy = {
    category: 'Servicios',
    title: 'Empresa de Servicios Reduce Reclamos en un 60% con un Chatbot Inteligente de Postventa',
    subtitle: 'Automatización de consultas, derivaciones y estado del servicio en tiempo real.',
    testimonial: {
        quote: 'El 80% de las consultas ahora se resuelven solas. El equipo trabaja más tranquilo y los clientes reciben respuestas inmediatas.',
        author: 'Jefe de Soporte',
        role: 'Empresa de Servicios',
    },
    metrics: [
        { value: '-60%', label: 'Reclamos al Call Center', icon: TrendingDown },
        { value: '+80%', label: 'Consultas en <30s', icon: Zap },
        { value: '-50%', label: 'Costo Operativo', icon: DollarSign },
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
                                El área de soporte estaba saturada por reclamos y consultas repetitivas. La atención era lenta y costosa, y no había visibilidad clara del estado de cada caso.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-headline font-bold">La Solución Datelia</h2>
                            <p className="text-accent-foreground/80 leading-relaxed">
                                Implementamos un chatbot IA 24/7 integrado a los sistemas internos. Responde consultas en segundos, brinda información actualizada sobre servicios y deriva automáticamente casos complejos al equipo humano.
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
                                Retorno estimado: <strong className="text-foreground">3.5× en 45 días</strong>, gracias a la disminución del volumen de llamados, la reducción del costo operativo y la mejora en la experiencia del cliente.
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
                    <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">Automatiza tu soporte y mejora la experiencia del cliente. Hablemos de tu proyecto.</p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contacto">Solicitar una Consultoría</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default CaseStudyPage;
