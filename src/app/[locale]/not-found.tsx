'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { ROUTES } from '../../consts/routes.const';
import NotFoundPage from '../../page-components/NotFoundPage/NotFoundPage';

const NotFound = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <NotFoundPage
      title={t('title')}
      description={t('description')}
      returnButton={
        <Link href={ROUTES.ROOT.path} className="button w-fit">
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
