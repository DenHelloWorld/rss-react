export const LOCALES = {
  EN: 'en',
  RU: 'ru',
} as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const DEFAULT_LOCALE: Locale = LOCALES.EN;
