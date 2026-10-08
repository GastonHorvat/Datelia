import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, FileCheck, Handshake } from 'lucide-react';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'about_us.hero' });
  const title = `${t('title')} | Datelia`;

  return {
    title,
    description: t('subtitle'),
    openGraph: { title, description: t('subtitle'), images: [ogImageUrl(t('title'), t('subtitle'))] },
    alternates: buildAlternates('/sobre-nosotros', params.locale),
  };
}

function PersonPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-xl">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

const AboutUsPage = () => {
  const t = useTranslations('about_us');
  const locale = useLocale();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16 sm:pt-40 sm:pb-20 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 max-w-3xl tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-16 text-center">
            {t('leadership.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Gastón */}
            <div className="flex flex-col items-center text-center space-y-5">
              <PersonPhoto src="/images/Gas2.jpeg" alt={t('leadership.gaston.full_name')} />
              <div className="space-y-1">
                <h3 className="text-xl font-headline font-bold">{t('leadership.gaston.full_name')}</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-xs">
                  {t('leadership.gaston.title')}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {t('leadership.gaston.bio')}
              </p>
            </div>

            {/* Jimena */}
            <div className="flex flex-col items-center text-center space-y-5">
              <PersonPhoto src="/images/Jime2.jpeg" alt={t('leadership.jimena.full_name')} />
              <div className="space-y-1">
                <h3 className="text-xl font-headline font-bold">{t('leadership.jimena.full_name')}</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-xs">
                  {t('leadership.jimena.title')}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {t('leadership.jimena.bio')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / How we work Section */}
      <section className="py-20 sm:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-16 text-center">
            {t('philosophy.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-8 space-y-4">
                <Wrench className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-bold">{t('philosophy.p1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.p1.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="pt-8 space-y-4">
                <FileCheck className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-bold">{t('philosophy.p2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.p2.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="pt-8 space-y-4">
                <Handshake className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-bold">{t('philosophy.p3.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.p3.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium">
            {t('cta.subtitle')}
          </p>
          <Button asChild size="lg" variant="secondary" className="font-bold px-8">
            <Link href={`/${locale}/contacto`}>{t('cta.button')}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUsPage;
