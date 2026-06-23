import { defineRouting } from 'next-intl/routing';
import { LOCALES, DEFAULT_LOCALE } from '../consts/locales.const';

export const routing = defineRouting({
  locales: Object.values(LOCALES),
  defaultLocale: DEFAULT_LOCALE,
});
