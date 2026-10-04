import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SolutionPageTemplate } from '@/components/solutions/solution-page-template';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'sol_rendicion.hero' });
  return {
    title: `${t('title')} | Datelia`,
    description: t('subtitle'),
  };
}

export default function RendicionDeGastosPage() {
  return (
    <SolutionPageTemplate
      namespace="sol_rendicion"
      icon="receipt"
      stepCount={5}
      includeCount={6}
      relatedCases={[
        { slug: 'cedsa', name: 'cedsa' },
        { slug: 'la-francisca', name: 'la_francisca' },
      ]}
    />
  );
}
