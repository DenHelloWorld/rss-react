import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import '../index.css';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Art Institute of Chicago',
    default: 'Art Institute of Chicago',
  },
  icons: { icon: '/favicon.png' },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script src="/theme-init.js" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
