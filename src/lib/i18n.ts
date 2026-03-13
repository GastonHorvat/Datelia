export const defaultLocale = 'es';
export const locales = ['es', 'en', 'pt'] as const;
export type Locale = typeof locales[number];

// Placeholder for translation dictionaries. 
// In the future, this can be replaced by next-intl or i18next
const dictionaries: Record<Locale, () => Promise<any>> = {
  es: () => import('@/locales/es.json').then((module) => module.default),
  en: () => import('@/locales/en.json').then((module) => module.default),
  pt: () => import('@/locales/pt.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
};

export function useTranslation() {
  // Client-side translation hook placeholder.
  // In a real implementation with next-intl, you'd use `useTranslations()`
  return {
    t: (key: string, _fallback?: string) => {
      // Return a dummy translation logic strictly for the placeholder
      // For now, we will hardcode the copy directly in the components as the user is going to populate dictionaries later.
      return _fallback || key;
    }
  };
}
