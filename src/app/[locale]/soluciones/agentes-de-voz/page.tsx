"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Iconos profesionales de lucide-react
import {
  PhoneOff,
  CalendarX2,
  Clock,
  Users,
  CalendarClock,
  TrendingDown,
  UserCheck,
  Spline
} from 'lucide-react';

const VoiceAgentsPage = () => {
  const t = useTranslations('voice_agents_page');
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

  const problemIcons = [PhoneOff, CalendarX2, Clock, Users];
  const benefitIcons = [CalendarClock, TrendingDown, UserCheck, Spline];

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-40 sm:pb-20 text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>

        <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 tracking-tight max-w-4xl">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-accent-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              {t('subtitle')}
            </p>
            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              <Link href={`/${locale}/contacto`}>{t('cta_demo')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{t('problems_title')}</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {(t.raw('problems') as string[]).map((text, index) => {
              const Icon = problemIcons[index % problemIcons.length];
              return (
                <div key={index} className="flex items-start gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="bg-primary/10 p-4 rounded-xl">
                    <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution/Benefits Section */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">{t('benefits_title')}</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              {t('benefits_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(t.raw('benefits') as {title: string, desc: string}[]).map((benefit, index) => {
              const Icon = benefitIcons[index % benefitIcons.length];
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700 p-8 flex gap-6 items-start hover:bg-slate-800 transition-all group">
                  <div className="bg-primary/20 p-4 rounded-xl group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{benefit.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{benefit.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-headline font-bold mb-12">{t('use_cases_title')}</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {(t.raw('use_cases') as string[]).map((useCase) => (
              <Badge key={useCase} variant="secondary" className="text-lg px-6 py-3 bg-slate-100 hover:bg-primary hover:text-white transition-all cursor-default border-none">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 sm:py-32 bg-accent text-accent-foreground relative">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="relative inline-block mb-8">
            <Image
              src="/images/carolinaVitalia.jpg"
              alt={t('testimonial.author')}
              width={100}
              height={100}
              className="rounded-full mx-auto border-4 border-primary/20 ring-4 ring-primary/5 shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full shadow-lg">
              <Spline className="w-5 h-5 text-white" />
            </div>
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium italic mb-10 text-accent-foreground leading-snug">
            {t('testimonial.quote')}
          </blockquote>
          <div>
            <p className="text-xl font-bold text-primary">{t('testimonial.author')}</p>
            <p className="text-lg text-accent-foreground/70">{t('testimonial.role')}</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground text-center py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-20" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 tracking-tight">{t('final_cta.title')}</h2>
          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed font-light">
            {t('final_cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full bg-white text-primary hover:bg-slate-100 shadow-xl transition-all">
              <Link href={`/${locale}/contacto`}>{t('final_cta.button_saving')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-2 border-white text-white hover:bg-white/10 transition-all">
              <Link href={`/${locale}/contacto`}>{t('final_cta.button_demo')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VoiceAgentsPage;