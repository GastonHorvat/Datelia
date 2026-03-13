import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './lib/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
  
  // optionally toggle locale prefixing
  localePrefix: 'as-needed' // Removes prefix for default locale (e.g., /es -> /)
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
