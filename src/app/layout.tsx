import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import '../index.css';
import Providers from './providers';
import Header from '../components/Header/Header';
import type { ReactNode } from 'react';
import { COOKIE_KEYS } from '../utils/cookie-storage/cookie-storage';
import { THEME } from '../consts/theme.const';

export const metadata: Metadata = {
  title: 'Art Institute of Chicago',
  icons: { icon: '/favicon.png' },
};

const RootLayout = async ({
  children,
  details,
}: {
  children: ReactNode;
  details: ReactNode;
}) => {
  const cookieStore = await cookies();
  const theme =
    cookieStore.get(COOKIE_KEYS.THEME)?.value === THEME.DARK
      ? THEME.DARK
      : THEME.LIGHT;

  return (
    <html lang="en" className={theme}>
      <body>
        <Providers theme={theme}>
          <div className="app-wrapper">
            <Header />
            <main className="main">
              {children}
              {details}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
