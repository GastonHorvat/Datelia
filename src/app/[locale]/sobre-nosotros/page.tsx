import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Lightbulb, Handshake } from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'about_us.hero' });

  return {
    title: `${t('title')} | Datelia`,
    description: t('subtitle'),
  };
}

const AboutUsPage = () => {
  const t = useTranslations('about_us');
  const locale = useLocale();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16 sm:pt-40 sm:pb-24 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Badge className="mb-4">{t('leadership.title')}</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 max-w-4xl tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto leading-relaxed">
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
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Jimena */}
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/jime.jpg"
                  alt="Jimena"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold">Jimena</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">
                  {t('leadership.jimena.title')}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {t('leadership.jimena.bio')}
              </p>
            </div>

            {/* Gastón */}
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/Gas.png"
                  alt="Gastón"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold">Gastón</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">
                  {t('leadership.gaston.title')}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {t('leadership.gaston.bio')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-16 text-center">
            {t('philosophy.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Target className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">{t('philosophy.p1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.p1.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Lightbulb className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">{t('philosophy.p2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.p2.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <Handshake className="w-12 h-12 text-primary" />
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
        <div className="container mx-auto px-4 space-y-8">
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

// Simple Badge component
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary ${className}`}>
    {children}
  </span>
);

export default AboutUsPage;