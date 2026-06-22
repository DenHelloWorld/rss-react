import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { type Locale } from '../../consts/locales.const';
import Providers from '../providers';
import Header from '../../components/Header/Header';
import MainPanel from '../../components/MainPanel/MainPanel';
import Flyout from '../../layouts/Flyout/Flyout';
import { NavigationLoadingProvider } from '../../contexts/NavigationLoadingContext';
import { type ReactNode } from 'react';

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

  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: 'ErrorPage' });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers resetLabel={t('reset')}>
        <NavigationLoadingProvider>
          <div className="app-wrapper">
            <Header locale={locale} />
            <main className="main">
              <MainPanel>{children}</MainPanel>
              {details}
            </main>
            <Flyout />
          </div>
        </NavigationLoadingProvider>
      </Providers>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
