import { type Locale } from '../../../../consts/locales.const';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ArtworkResultsLayout from '../../../../layouts/ArtworkResultsLayout/ArtworkResultsLayout';

type Props = {
  params: Promise<{ locale: Locale; id: string }>;
};

const DetailsChildrenSlot = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense>
      <ArtworkResultsLayout />
    </Suspense>
  );
};

export default DetailsChildrenSlot;
