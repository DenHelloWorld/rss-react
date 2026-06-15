import type { Metadata } from 'next';
import '../index.css';
import Providers from './providers';
import Header from '../components/Header/Header';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Art Institute of Chicago',
  icons: { icon: '/favicon.png' },
};

const RootLayout = ({
  children,
  details,
}: {
  children: ReactNode;
  details: ReactNode;
}) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <script src="/theme-init.js" />
    </head>
    <body>
      <Providers>
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

export default RootLayout;
