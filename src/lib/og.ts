/**
 * URL de la imagen OG generada dinámicamente (ver src/app/api/og/route.tsx).
 * Evita depender de archivos de imagen estáticos por página.
 */
export function ogImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set('subtitle', subtitle);
  return `/api/og?${params.toString()}`;
}
