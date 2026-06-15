import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  SEARCH_TERM: 'search_term',
  THEME: 'theme',
} as const;

export type CookieSchema = {
  [COOKIE_KEYS.SEARCH_TERM]: string;
  [COOKIE_KEYS.THEME]: string;
};

export type CookieKeyType = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export const getItem = <K extends keyof CookieSchema>(
  key: K
): CookieSchema[K] | null => Cookies.get(key) ?? null;

export const setItem = <K extends keyof CookieSchema>(
  key: K,
  value: CookieSchema[K]
): void => {
  Cookies.set(key, value, { path: '/', expires: 365 });
};

export const removeItem = (key: CookieKeyType): void => {
  Cookies.remove(key, { path: '/' });
};
