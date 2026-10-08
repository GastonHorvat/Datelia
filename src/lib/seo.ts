import type { Metadata } from 'next';

export function buildAlternates(
  pathWithoutLocale: string,
  currentLocale: string
): Metadata['alternates'] {
  const baseUrl = 'https://www.datelia.com.ar';

  return {
    canonical:
      currentLocale === 'es'
        ? `${baseUrl}${pathWithoutLocale}`
        : `${baseUrl}/${currentLocale}${pathWithoutLocale}`,
    languages: {
      es: `${baseUrl}${pathWithoutLocale}`,
      en: `${baseUrl}/en${pathWithoutLocale}`,
      pt: `${baseUrl}/pt${pathWithoutLocale}`,
      'x-default': `${baseUrl}${pathWithoutLocale}`,
    },
  };
}
