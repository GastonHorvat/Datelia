import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SolutionPageTemplate } from '@/components/solutions/solution-page-template';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'sol_tableros.hero' });
  return {
    title: `${t('title')} | Datelia`,
    description: t('subtitle'),
  };
}

export default function TablerosDeGestionPage() {
  return (
    <SolutionPageTemplate
      namespace="sol_tableros"
      icon="layout-dashboard"
      stepCount={4}
      includeCount={4}
      screenshotSrc="/images/tableros-dashboard-real.jpeg"
      relatedCases={[
        { slug: 'la-francisca', name: 'la_francisca' },
        { slug: 'la-tablada', name: 'la_tablada' },
      ]}
    />
  );
}
