import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales, Locale} from '@/lib/i18n';

export default getRequestConfig(async ({requestLocale}) => {
  // Validate that the incoming `locale` parameter is valid
  const currentLocale = await requestLocale;
  if (!currentLocale || !locales.includes(currentLocale as Locale)) notFound();

  return {
    locale: currentLocale,
    messages: (await import(`../locales/${currentLocale}.json`)).default
  };
});
