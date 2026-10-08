import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SolutionPageTemplate } from '@/components/solutions/solution-page-template';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'sol_rendicion.hero' });
  const title = `${t('title')} | Datelia`;
  return {
    title,
    description: t('subtitle'),
    openGraph: { title, description: t('subtitle'), images: [ogImageUrl(t('title'), t('subtitle'))] },
    alternates: buildAlternates('/soluciones/rendicion-de-gastos', locale),
  };
}

export default function RendicionDeGastosPage() {
  return (
    <SolutionPageTemplate
      namespace="sol_rendicion"
      icon="receipt"
      stepCount={5}
      includeCount={6}
      screenshotSrc="/images/rendicion-de-gastos-real.png"
      screenshotWidth={1567}
      screenshotHeight={1894}
      relatedCases={[
        { slug: 'cedsa', name: 'cedsa' },
        { slug: 'la-francisca', name: 'la_francisca' },
      ]}
    />
  );
}
