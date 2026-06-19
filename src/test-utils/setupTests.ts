import React from 'react';
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/'),
  useParams: vi.fn(() => ({})),
}));

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ href, children }: { href: string; children: unknown }) => children,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
    })),
    usePathname: vi.fn(() => '/'),
    redirect: vi.fn(),
    getPathname: vi.fn(),
  }),
}));

vi.mock('../i18n/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() })),
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: unknown;
    className?: string;
  }) =>
    React.createElement('a', { href, className }, children as React.ReactNode),
  redirect: vi.fn(),
  getPathname: vi.fn(),
}));

vi.mock('next-intl/server', async () => {
  const en = (await import('../../messages/en.json')).default as Record<
    string,
    Record<string, string>
  >;
  const t =
    (namespace: string) => (key: string, params?: Record<string, unknown>) => {
      let value = en[namespace]?.[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    };
  return {
    getTranslations: vi.fn(async (namespace: string) => t(namespace)),
    setRequestLocale: vi.fn(),
  };
});

vi.mock('next-intl', async () => {
  const en = (await import('../../messages/en.json')).default as Record<
    string,
    Record<string, string>
  >;
  const t =
    (namespace: string) => (key: string, params?: Record<string, unknown>) => {
      let value = en[namespace]?.[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    };
  return { useTranslations: t };
});
import { cleanup } from '@testing-library/react';
import { CONSOLE_ERROR_SPY, CONSOLE_WARN_SPY } from './console-spies.const.ts';
import { AICServerMock } from './server.ts';
import { localStorageMock, StorageMock } from './storage-mock.ts';

beforeAll(() => AICServerMock.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  CONSOLE_ERROR_SPY.mockClear();
  CONSOLE_WARN_SPY.mockClear();
  AICServerMock.resetHandlers();
});

afterAll(() => {
  AICServerMock.close();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.IntersectionObserver = vi.fn().mockImplementation(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: vi.fn(() => []),
  };
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});

global.Storage = StorageMock;
window.Storage = StorageMock;

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: vi.fn(),
});
