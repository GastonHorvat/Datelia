import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ProblemVsSolutionSection } from '@/components/solutions/problem-vs-solution';
import { CtaSection } from '@/components/landing/cta-section';

// Iconos profesionales de lucide-react
import { Bot, Mic, Wrench, CheckCircle2 } from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions_page.hero' });

  return {
    title: `${t('title')} | Datelia`,
    description: t('subtitle'),
  };
}

const SolutionsPage = () => {
  const t = useTranslations('solutions_page');
  const locale = useLocale();

  const solutions = [
    {
      icon: Bot,
      title: t('solutions.chatbots.title'),
      description: t('solutions.chatbots.description'),
      benefits: [
        t('solutions.chatbots.benefits.0'),
        t('solutions.chatbots.benefits.1'),
        t('solutions.chatbots.benefits.2'),
      ],
      href: `/${locale}/soluciones/chatbots-inteligentes`,
      cta: t('solutions.chatbots.cta'),
    },
    {
      icon: Mic,
      title: t('solutions.voice_agents.title'),
      description: t('solutions.voice_agents.description'),
      benefits: [
        t('solutions.voice_agents.benefits.0'),
        t('solutions.voice_agents.benefits.1'),
        t('solutions.voice_agents.benefits.2'),
      ],
      href: `/${locale}/soluciones/agentes-de-voz`,
      cta: t('solutions.voice_agents.cta'),
    },
    {
      icon: Wrench,
      title: t('solutions.custom_ia.title'),
      description: t('solutions.custom_ia.description'),
      benefits: [
        t('solutions.custom_ia.benefits.0'),
        t('solutions.custom_ia.benefits.1'),
        t('solutions.custom_ia.benefits.2'),
      ],
      href: `/${locale}/contacto`,
      cta: t('solutions.custom_ia.cta'),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": t('hero.title'),
    "provider": {
      "@type": "Organization",
      "name": "Datelia",
      "url": "https://www.datelia.com.ar"
    },
    "description": t('hero.subtitle'),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "Consultar"
    }
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* Solutions Presentation Sections */}
      {solutions.map((solution, index) => {
        const Icon = solution.icon;
        return (
          <section key={index} className={`py-20 sm:py-24 ${index % 2 === 0 ? 'bg-background text-foreground' : 'bg-accent text-accent-foreground'}`}>
            <div className="container mx-auto px-4">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`flex justify-center ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <Icon className="w-32 h-32 md:w-48 md:h-48 text-primary" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-headline font-bold">
                    {solution.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {solution.description}
                  </p>
                  <div className="space-y-3">
                    {solution.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-4">
                    <Link href={solution.href}>{solution.cta} →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Problem vs Solution Section */}
      <ProblemVsSolutionSection />

      {/* Final CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default SolutionsPage;