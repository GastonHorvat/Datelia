import { redirect } from 'next/navigation';

// Este caso no era real. Redirige al listado mientras se publican los 3 casos reales (CEDSA, La Francisca, La Tablada).
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  redirect(`/${locale}/casos-de-exito`);
}
