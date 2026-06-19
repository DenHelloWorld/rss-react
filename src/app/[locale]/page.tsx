import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { type Locale } from '../../consts/locales.const';
import ArtworkResultsLayout from '../../layouts/ArtworkResultsLayout/ArtworkResultsLayout';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return { title: t('title') };
};

const HomePage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense>
      <ArtworkResultsLayout />
    </Suspense>
  );
};

export default HomePage;
