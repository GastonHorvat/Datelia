import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CasePageTemplate } from '@/components/case-studies/case-page-template';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'caso_la_tablada' });
  return {
    title: `${t('title')} | Datelia`,
    description: t('summary'),
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
    />
  );
}
