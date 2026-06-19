import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { type Locale } from '../../../consts/locales.const';
import AboutPage from '../../../page-components/AboutPage/AboutPage';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  return { title: t('title') };
};

const AboutRoute = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
};

export default AboutRoute;
