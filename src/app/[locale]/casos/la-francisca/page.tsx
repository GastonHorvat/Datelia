import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CasePageTemplate } from '@/components/case-studies/case-page-template';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'caso_la_francisca' });
  return {
    title: `${t('title')} | Datelia`,
    description: t('summary'),
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
    />
  );
}
