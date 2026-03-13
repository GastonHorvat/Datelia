import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { SectorsSection } from '@/components/case-studies/sectors-section';
import { CtaSection } from '@/components/landing/cta-section';

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
  const locale = useLocale();

  const caseStudies = [
    {
      category: t('categories.retail'),
      title: t('cases.retail.title'),
      summary: t('cases.retail.summary'),
      metrics: [
        t('cases.retail.metrics.0'),
        t('cases.retail.metrics.1'),
        t('cases.retail.metrics.2'),
      ],
      href: `/${locale}/casos-de-exito/caso-retail-chatbot`,
    },
    {
      category: t('categories.health'),
      title: t('cases.health.title'),
      summary: t('cases.health.summary'),
      metrics: [
        t('cases.health.metrics.0'),
        t('cases.health.metrics.1'),
        t('cases.health.metrics.2'),
      ],
      href: `/${locale}/casos-de-exito/caso-clinica-agente-voz`,
    },
    {
      category: t('categories.logistics'),
      title: t('cases.logistics.title'),
      summary: t('cases.logistics.summary'),
      metrics: [
        t('cases.logistics.metrics.0'),
        t('cases.logistics.metrics.1'),
        t('cases.logistics.metrics.2'),
      ],
      href: `/${locale}/casos-de-exito/caso-logistica-ia-medida`,
    },
    {
      category: t('categories.construction'),
      title: t('cases.construction.title'),
      summary: t('cases.construction.summary'),
      metrics: [
        t('cases.construction.metrics.0'),
        t('cases.construction.metrics.1'),
        t('cases.construction.metrics.2'),
      ],
      href: `/${locale}/casos-de-exito/caso-construccion-reduccion-errores`,
    },
    {
      category: t('categories.agro'),
      title: t('cases.agro.title'),
      summary: t('cases.agro.summary'),
      metrics: [
        t('cases.agro.metrics.0'),
        t('cases.agro.metrics.1'),
        t('cases.agro.metrics.2'),
      ],
      href: `/${locale}/casos-de-exito/caso-agroindustria-automatizacion-pedidos`,
    },
    {
      category: t('categories.services'),
      title: t('cases.services.title'),
      summary: t('cases.services.summary'),
      metrics: [
        t('cases.services.metrics.0'),
        t('cases.services.metrics.1'),
        t('cases.services.metrics.2'),
      ],
      href: `/${locale}/casos-de-exito/caso-servicios-chatbot-postventa`,
    },
  ];

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

      {/* Case Studies Gallery */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-headline font-bold mb-4">{t('gallery.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('gallery.subtitle')}
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
                      <span>{t('cta')}</span>
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