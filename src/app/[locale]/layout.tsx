import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { type Locale } from '../../consts/locales.const';
import Providers from '../providers';
import Header from '../../components/Header/Header';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  details: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

const LocaleLayout = async ({ children, details, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('ErrorPage');

  return (
    <NextIntlClientProvider>
      <Providers resetLabel={t('reset')}>
        <div className="app-wrapper">
          <Header />
          <main className="main">
            {children}
            {details}
          </main>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
