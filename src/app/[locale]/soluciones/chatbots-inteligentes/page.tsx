"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

// Componentes de tu UI y Layout
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  Clock,
  Users,
  MessageSquareWarning,
  Frown,
  TrendingUp,
  ShieldHalf,
  AppWindow,
  BrainCircuit
} from "lucide-react";
import { Layout } from '@/components/layout';

const ChatbotsPage = () => {
    const t = useTranslations('chatbots_page');
    const locale = useLocale();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": t('title'),
        "provider": {
            "@type": "Organization",
            "name": "Datelia",
            "url": "https://www.datelia.com.ar"
        },
        "description": t('subtitle'),
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceRange": locale === 'es' ? 'Consultar' : locale === 'pt' ? 'Consultar' : 'Contact for pricing'
        }
    };

    const problemIcons = [Clock, Users, MessageSquareWarning, Frown];
    const benefitIcons = [TrendingUp, ShieldHalf, AppWindow, BrainCircuit];

    return (
        <Layout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-40 sm:pb-20 text-center relative overflow-hidden">
                <div className="container mx-auto text-center px-4 flex flex-col items-center relative z-10">
                    <Breadcrumbs className="mb-8" />
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-headline font-bold mb-6 tracking-tight max-w-4xl"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-accent-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t('subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            <Link href={`/${locale}/contacto`}>{t('cta_demo')}</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 sm:py-32 bg-background">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16">{t('problem_title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {(t.raw('problems') as {title: string, desc: string}[]).map((prob, index) => {
                            const Icon = problemIcons[index % problemIcons.length];
                            return (
                                <motion.div 
                                    key={index} 
                                    className="flex items-start gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="bg-primary/10 p-4 rounded-xl">
                                        <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">{prob.title}</h3>
                                        <p className="text-slate-600 text-lg leading-relaxed">{prob.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Solution/Benefits Section */}
            <section className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="container mx-auto max-w-6xl px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16">{t('benefits_title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(t.raw('benefits') as {title: string, desc: string}[]).map((benefit, index) => {
                            const Icon = benefitIcons[index % benefitIcons.length];
                            return (
                                <Card key={index} className="bg-slate-800/50 border-slate-700 p-8 text-center hover:bg-slate-800 transition-all group shadow-2xl">
                                    <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{benefit.desc}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 sm:py-32 bg-background">
                <div className="container mx-auto max-w-4xl px-4">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-20">{t('process_title')}</h2>
                    <div className="relative pl-12 sm:pl-16">
                        {/* Vertical Line */}
                        <div className="absolute left-[23px] sm:left-[31px] top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full shadow-sm shadow-primary/20"></div>
                        
                        {/* Timeline Items */}
                        <div className="space-y-16">
                            {(t.raw('process_steps') as {title: string, desc: string}[]).map((item, index) => (
                                <motion.div 
                                    key={index} 
                                    className="relative"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="absolute -left-[54px] sm:-left-[68px] top-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border-4 border-primary/20 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary shadow-xl z-10">
                                        {index + 1}
                                    </div>
                                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                                        <h3 className="text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                                        <p className="text-lg text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24 sm:py-32 bg-accent text-accent-foreground">
                <div className="container mx-auto max-w-4xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/images/martinAventura.jpg"
                            alt={t('testimonial.author')}
                            width={100}
                            height={100}
                            className="rounded-full mx-auto mb-10 border-4 border-primary/20 shadow-2xl"
                        />
                        <blockquote className="text-2xl md:text-4xl font-headline font-medium italic mb-10 leading-snug">
                            {t('testimonial.quote')}
                        </blockquote>
                        <div>
                            <p className="text-2xl font-bold text-primary">{t('testimonial.author')}</p>
                            <p className="text-lg text-accent-foreground/70">{t('testimonial.role')}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 opacity-20" />
                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 tracking-tight">{t('final_cta.title')}</h2>
                    <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 leading-relaxed font-light">
                        {t('final_cta.description')}
                    </p>
                    <Button asChild size="lg" variant="secondary" className="h-16 px-12 text-xl rounded-full bg-white text-primary hover:bg-slate-100 shadow-2xl transition-all">
                        <Link href={`/${locale}/contacto`}>{t('final_cta.button')}</Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default ChatbotsPage;