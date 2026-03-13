import React from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Layout } from '@/components/layout';
import { ContactForm } from '@/components/contact/contact-form';
import Image from 'next/image';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'contact_page.hero' });

  return {
    title: `${t('title')} | Datelia`,
    description: t('description'),
  };
}

export default function ContactPage() {
  const t = useTranslations('contact_page');

  return (
    <Layout>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 text-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero-bg.png"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight text-white drop-shadow-md">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-slate-100 max-w-2xl mx-auto mb-2 font-medium drop-shadow-sm">
            {t('hero.subtitle')}
          </p>
          <p className="text-md text-slate-300 max-w-xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-slate-50 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl -mt-20">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}