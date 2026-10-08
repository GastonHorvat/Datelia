import React from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Layout } from '@/components/layout';
import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'contact_page.hero' });
  const title = `${t('title')} | Datelia`;
  const description = `${t('subtitle')} ${t('description')}`;

  return {
    title,
    description,
    openGraph: { title, description, images: [ogImageUrl(t('title'), t('subtitle'))] },
    alternates: buildAlternates('/contacto', params.locale),
  };
}

export default function ContactPage() {
  const t = useTranslations('contact_page');

  return (
    <Layout>
      <section className="bg-accent text-accent-foreground pt-32 pb-12 sm:pt-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-accent-foreground/80 max-w-xl mx-auto">
            {t('hero.subtitle')} {t('hero.description')}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-xl space-y-8">
          {/* Opción A: Calendly (principal) */}
          <a href={siteConfig.links.calendly} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="border-primary/30 bg-primary/5 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center space-y-3">
                <Calendar className="h-9 w-9 text-primary mx-auto" />
                <h2 className="text-xl font-bold font-headline">{t('calendly.title')}</h2>
                <p className="text-muted-foreground">{t('calendly.description')}</p>
                <Button size="lg" className="mt-2">{t('calendly.button')}</Button>
              </CardContent>
            </Card>
          </a>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">{t('or_divider')}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Opción B: Formulario corto */}
          <ContactForm />

          {/* Opción C: WhatsApp directo */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <a
                href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('whatsapp_button')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
