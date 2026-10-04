import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CasePageTemplate } from '@/components/case-studies/case-page-template';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'caso_cedsa' });
  return {
    title: `${t('title')} | Datelia`,
    description: t('summary'),
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
    />
  );
}
