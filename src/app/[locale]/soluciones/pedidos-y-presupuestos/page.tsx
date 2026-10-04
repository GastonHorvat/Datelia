import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SolutionPageTemplate } from '@/components/solutions/solution-page-template';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'sol_pedidos.hero' });
  return {
    title: `${t('title')} | Datelia`,
    description: t('subtitle'),
  };
}

export default function PedidosYPresupuestosPage() {
  return (
    <SolutionPageTemplate
      namespace="sol_pedidos"
      icon="clipboard-list"
      stepCount={5}
      includeCount={6}
      relatedCases={[
        { slug: 'la-tablada', name: 'la_tablada' },
        { slug: 'la-francisca', name: 'la_francisca' },
      ]}
    />
  );
}
