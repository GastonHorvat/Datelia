import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CasePageTemplate } from '@/components/case-studies/case-page-template';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'caso_cedsa' });
  const title = `${t('title')} | Datelia`;
  return {
    title,
    description: t('summary'),
    openGraph: { title, description: t('summary'), images: [ogImageUrl(t('title'), t('summary'))] },
    alternates: buildAlternates('/casos/cedsa', locale),
  };
}

export default function CedsaPage() {
  return (
    <CasePageTemplate
      namespace="caso_cedsa"
      whatWeDidShape="list"
      whatWeDidCount={5}
      hasQuote
      hasNextStage={false}
      logoSrc="/images/logos/cedsa.png"
      logoWidth={550}
      logoHeight={557}
      screenshotSrc="/images/casos/cedsa-real.png"
      screenshotWidth={1319}
      screenshotHeight={2009}
    />
  );
}
