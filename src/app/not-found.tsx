import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import NotFoundPage from '../page-components/NotFoundPage/NotFoundPage';

const NotFound = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'NotFoundPage' });

  return (
    <NotFoundPage
      title={t('title')}
      description={t('description')}
      returnButton={
        <Link href={`/${locale}`} className="button w-fit">
          <svg>
            <use href="/icons.svg#refresh" />
          </svg>
          {t('returnButton')}
        </Link>
      }
    />
  );
};

export default NotFound;
