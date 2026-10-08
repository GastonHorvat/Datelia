import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SolutionPageTemplate } from '@/components/solutions/solution-page-template';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'sol_pedidos.hero' });
  const title = `${t('title')} | Datelia`;
  return {
    title,
    description: t('subtitle'),
    openGraph: { title, description: t('subtitle'), images: [ogImageUrl(t('title'), t('subtitle'))] },
    alternates: buildAlternates('/soluciones/pedidos-y-presupuestos', locale),
  };
}

export default function PedidosYPresupuestosPage() {
  return (
    <SolutionPageTemplate
      namespace="sol_pedidos"
      icon="clipboard-list"
      stepCount={5}
      includeCount={6}
      screenshotSrc="/images/pedidos-y-presupuestos-real.png"
      screenshotWidth={1653}
      screenshotHeight={970}
      relatedCases={[
        { slug: 'la-tablada', name: 'la_tablada' },
        { slug: 'la-francisca', name: 'la_francisca' },
      ]}
    />
  );
}
