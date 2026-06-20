import { vi } from 'vitest';
import en from '../../../messages/en.json';

const translations = en as Record<string, Record<string, string>>;

const createTranslator =
  (namespace: string) => (key: string, params?: Record<string, unknown>) => {
    let value = translations[namespace]?.[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  };

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (namespace: string) =>
    createTranslator(namespace)
  ),
  setRequestLocale: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: createTranslator,
}));
