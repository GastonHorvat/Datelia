import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Layout } from '@/components/layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, ArrowRight } from 'lucide-react';
import { SectorsSection } from '@/components/case-studies/sectors-section';
import { CtaSection } from '@/components/landing/cta-section';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/datelia';
const LOGOS: Record<string, { src: string; width: number; height: number }> = {
  cedsa: { src: '/images/logos/cedsa.png', width: 550, height: 557 },
  'la-francisca': { src: '/images/logos/la-francisca.png', width: 399, height: 206 },
  'la-tablada': { src: '/images/logos/la-tablada.webp', width: 332, height: 100 },
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'casos_page.hero' });
  const title = `${t('title')} | Datelia`;

  return {
    title,
    description: t('subtitle'),
    openGraph: { title, description: t('subtitle'), images: [ogImageUrl(t('title'), t('subtitle'))] },
    alternates: buildAlternates('/casos', params.locale),
  };
}

const CasosPage = () => {
  const t = useTranslations('casos_page');
  const tCaseNames = useTranslations('case_names');
  const locale = useLocale();

  const testimonials = [0, 1].map((i) => ({
    quote: t(`testimonials.${i}.quote`),
    author: t(`testimonials.${i}.author`),
    source: t(`testimonials.${i}.source`),
  }));

  // useTranslations no acepta namespace dinámico por caso, así que cada
  // resumen se busca directo contra su propio namespace caso_*.
  const tCedsa = useTranslations('caso_cedsa');
  const tFrancisca = useTranslations('caso_la_francisca');
  const tTablada = useTranslations('caso_la_tablada');

  const cases = [
    { slug: 'cedsa', name: tCaseNames('cedsa'), summary: tCedsa('summary') },
    { slug: 'la-francisca', name: tCaseNames('la_francisca'), summary: tFrancisca('summary') },
    { slug: 'la-tablada', name: tCaseNames('la_tablada'), summary: tTablada('summary') },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Clutch Testimonials */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="h-full flex flex-col">
                <CardContent className="pt-8 flex-grow flex flex-col">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-lg leading-relaxed flex-grow">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.author}</p>
                    <a
                      href={CLUTCH_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {testimonial.source}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={CLUTCH_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              {t('clutch_link')} →
            </a>
          </div>
        </div>
      </section>

      {/* Case Cards */}
      <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-12">
            {t('cases_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cases.map((c) => (
              <Link href={`/${locale}/casos/${c.slug}`} key={c.slug} className="block group h-full">
                <Card className="h-full flex flex-col bg-background hover:border-primary transition-colors">
                  <CardHeader>
                    <Image
                      src={LOGOS[c.slug].src}
                      alt={c.name}
                      width={LOGOS[c.slug].width}
                      height={LOGOS[c.slug].height}
                      className="self-start h-9 w-auto object-contain mb-3"
                    />
                    <CardTitle className="text-xl">{c.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{c.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center font-semibold text-primary">
                      <span>{t('cta_label')}</span>
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

export default CasosPage;
