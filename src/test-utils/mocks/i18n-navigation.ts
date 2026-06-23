import React from 'react';
import { vi } from 'vitest';

vi.mock('../../i18n/navigation', () => ({
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
