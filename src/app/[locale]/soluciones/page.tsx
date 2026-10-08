import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CtaSection } from '@/components/landing/cta-section';
import { Receipt, ClipboardList, FileSpreadsheet, LayoutDashboard, ArrowRight } from 'lucide-react';
import { ogImageUrl } from '@/lib/og';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions_overview' });
  const title = `${t('hero.title')} | Datelia`;

  return {
    title,
    description: t('hero.subtitle'),
    openGraph: { title, description: t('hero.subtitle'), images: [ogImageUrl(t('hero.title'), t('hero.subtitle'))] },
  };
}

const SOLUTIONS = [
  { icon: Receipt, slug: 'rendicion-de-gastos', key: 'rendicion' },
  { icon: ClipboardList, slug: 'pedidos-y-presupuestos', key: 'pedidos' },
  { icon: FileSpreadsheet, slug: 'facturas-y-proveedores', key: 'facturas' },
  { icon: LayoutDashboard, slug: 'tableros-de-gestion', key: 'tableros' },
];

const SolutionsPage = () => {
  const t = useTranslations('solutions_overview');
  const locale = useLocale();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16 sm:pt-32 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* 4 Cards */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SOLUTIONS.map(({ icon: Icon, slug, key }) => (
              <Card key={slug} className="flex flex-col h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline leading-snug">
                    {t(`cards.${key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground flex-grow">{t(`cards.${key}.description`)}</p>
                  <Button asChild variant="link" className="px-0 justify-start mt-4">
                    <Link href={`/${locale}/soluciones/${slug}`}>
                      {t('see_more')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-14 max-w-xl mx-auto">
            <p className="text-muted-foreground mb-4">{t('not_listed')}</p>
            <Button asChild>
              <Link href={`/${locale}/contacto`}>{t('cta_button')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection />
    </Layout>
  );
};

export default SolutionsPage;
