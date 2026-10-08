import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CasePageTemplate } from '@/components/case-studies/case-page-template';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'caso_la_tablada' });
  const title = `${t('title')} | Datelia`;
  return {
    title,
    description: t('summary'),
    openGraph: { title, description: t('summary'), images: [ogImageUrl(t('title'), t('summary'))] },
    alternates: buildAlternates('/casos/la-tablada', locale),
  };
}

export default function LaTabladaPage() {
  return (
    <CasePageTemplate
      namespace="caso_la_tablada"
      whatWeDidShape="list"
      whatWeDidCount={6}
      hasQuote
      hasNextStage
      logoSrc="/images/logos/la-tablada.webp"
      logoWidth={332}
      logoHeight={100}
      logoNeedsDarkChip
      screenshotSrc="/images/casos/la-tablada-real.png"
      screenshotWidth={1657}
      screenshotHeight={963}
    />
  );
}
