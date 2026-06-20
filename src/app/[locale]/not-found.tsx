import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import { ROUTES } from '../../consts/routes.const';
import NotFoundPage from '../../page-components/NotFoundPage/NotFoundPage';

const NotFound = async () => {
  const t = await getTranslations('NotFoundPage');

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
