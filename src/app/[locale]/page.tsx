import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { type Locale } from '../../consts/locales.const';
import ArtworkResultsPage from '../../components/ArtworkResults/ArtworkResultsPage';

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ query?: string; page?: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return { title: t('title') };
};

const HomePage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { query = '', page = '1' } = await searchParams;
  setRequestLocale(locale);

  return <ArtworkResultsPage query={query} currentPage={Number(page)} />;
};

export default HomePage;
