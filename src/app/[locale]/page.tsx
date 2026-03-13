import { HeroSection } from "@/components/landing/hero-section";
import { EnterpriseThesisSection } from "@/components/landing/enterprise-thesis-section";
import { TargetAudienceFilter } from "@/components/landing/target-audience-filter";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { LiveEventsSection } from "@/components/landing/live-events-section";
import { ErpIntegrationSection } from "@/components/landing/erp-integration-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Layout } from "@/components/layout";
import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'metadata' });

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
          url: '/images/og/og-home.jpg',
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
      images: ['/images/og/og-home.jpg'],
    },
    alternates: {
      canonical: 'https://www.datelia.com.ar',
    },
  };
}


export default function Home() {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <EnterpriseThesisSection />
        <TargetAudienceFilter />
        <ArchitectureSection />
        <LiveEventsSection />
        <ErpIntegrationSection />
        <FaqSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
