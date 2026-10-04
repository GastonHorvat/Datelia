import React from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { SectorsSection } from '@/components/case-studies/sectors-section';
import { CtaSection } from '@/components/landing/cta-section';

const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/datelia';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'case_studies_page.hero' });

  return {
    title: `${t('title')} | Datelia`,
    description: t('subtitle'),
  };
}

const CaseStudiesPage = () => {
  const t = useTranslations('case_studies_page');

  const testimonials = [0, 1].map((i) => ({
    quote: t(`testimonials.${i}.quote`),
    author: t(`testimonials.${i}.author`),
    source: t(`testimonials.${i}.source`),
  }));

  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Clutch Testimonials (interino, hasta publicar los casos reales con permiso de los clientes) */}
      <section className="py-20 sm:py-24 bg-background">
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
          <div className="text-center mt-10">
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

      {/* Sectors Section */}
      <SectorsSection />

      {/* Final CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default CaseStudiesPage;