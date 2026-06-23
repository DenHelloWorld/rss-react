import { type Locale } from '../../../../../consts/locales.const';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import DetailsPage from '../../../../../page-components/DetailsPage/DetailsPage';

type Props = {
  params: Promise<{ locale: Locale; id: string }>;
};

const DetailsSlot = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense>
      <DetailsPage />
    </Suspense>
  );
};

export default DetailsSlot;
