import { HeroSection } from "@/components/landing/hero-section";
import { TrustBarSection } from "@/components/landing/trust-bar-section";
import { ErpIntegrationSection } from "@/components/landing/erp-integration-section";
import { ProblemsSection } from "@/components/landing/problems-section";
import { HomeSolutionsSection } from "@/components/landing/home-solutions-section";
import { HomeCasesSection } from "@/components/landing/home-cases-section";
import { HomeTestimonialsSection } from "@/components/landing/home-testimonials-section";
import { HowWeWorkSection } from "@/components/landing/how-we-work-section";
import { WhyUsSection } from "@/components/landing/why-us-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Layout } from "@/components/layout";
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const ogImage = ogImageUrl(t('title'));

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://www.datelia.com.ar',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage],
    },
    alternates: buildAlternates('', locale),
  };
}


export default function Home() {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <TrustBarSection />
        <ErpIntegrationSection />
        <ProblemsSection />
        <HomeSolutionsSection />
        <HomeCasesSection />
        <HomeTestimonialsSection />
        <HowWeWorkSection />
        <WhyUsSection />
        <FaqSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
