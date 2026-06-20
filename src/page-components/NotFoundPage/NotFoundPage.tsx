import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import { ROUTES } from '../../consts/routes.const';
import LazyImage from '../../components/LazyImage/LazyImage';

const NotFoundPage = async () => {
  const t = await getTranslations('NotFoundPage');

  return (
    <section className="mx-auto container shell">
      <h1 className="title text-left">{t('title')}</h1>

      <div className="text-center flex flex-col items-center gap-4 w-full md:max-w-1/2 mx-auto">
        <div className="w-48 h-54">
          <LazyImage
            src="/404.webp"
            alt={t('description')}
            loading="eager"
            unoptimized={false}
            quality={90}
            width={192}
            height={216}
          />
        </div>
        <p className="text-center">{t('description')}</p>
        <Link href={ROUTES.ROOT.path} className="button w-fit">
          <svg>
            <use href="/icons.svg#refresh" />
          </svg>
          {t('returnButton')}
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
