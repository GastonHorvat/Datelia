import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TrackerPage } from '@/components/solutions/tracker-page';
import { ogImageUrl } from '@/lib/og';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'sol_tracker.hero' });
  const title = `${t('title')} | Datelia`;
  return {
    title,
    description: t('subtitle'),
    openGraph: { title, description: t('subtitle'), images: [ogImageUrl(t('title'), t('subtitle'))] },
    alternates: buildAlternates('/soluciones/tracker', locale),
  };
}

export default function TrackerSolutionPage() {
  return <TrackerPage />;
}
