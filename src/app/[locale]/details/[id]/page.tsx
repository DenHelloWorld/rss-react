import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '../../../../consts/locales.const';
import ArtworkResultsPage from '../../../../components/ArtworkResults/ArtworkResultsPage';

type Props = {
  params: Promise<{ locale: Locale; id: string }>;
  searchParams: Promise<{ query?: string; page?: string }>;
};

const DetailsChildrenSlot = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { query = '', page = '1' } = await searchParams;
  setRequestLocale(locale);

  return <ArtworkResultsPage query={query} currentPage={Number(page)} />;
};

export default DetailsChildrenSlot;
