import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CasePageTemplate } from '@/components/case-studies/case-page-template';
import { ogImageUrl } from '@/lib/og';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'caso_la_francisca' });
  const title = `${t('title')} | Datelia`;
  return {
    title,
    description: t('summary'),
    openGraph: { title, description: t('summary'), images: [ogImageUrl(t('title'), t('summary'))] },
  };
}

export default function LaFranciscaPage() {
  return (
    <CasePageTemplate
      namespace="caso_la_francisca"
      whatWeDidShape="stages"
      whatWeDidCount={3}
      hasQuote={false}
      hasNextStage={false}
      logoSrc="/images/logos/la-francisca.png"
      logoWidth={399}
      logoHeight={206}
      screenshotSrc="/images/casos/la-francisca-real.png"
      screenshotWidth={1641}
      screenshotHeight={1151}
    />
  );
}
