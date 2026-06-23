'use client';

import './LanguageSwitcher.css';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import { LOCALES, type Locale } from '../../consts/locales.const';

const getButtonClassName = (locale: Locale, currentLocale: string): string => {
  const isActive = locale === currentLocale;
  return `language-switcher__btn${isActive ? ' language-switcher__btn--active' : ''}`;
};

const LanguageSwitcher = () => {
  const t = useTranslations('LanguageSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  const handleChange = (locale: Locale) => {
    const query = searchParams.toString();
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { locale });
  };

  return (
    <div className="language-switcher">
      {Object.values(LOCALES).map((locale) => (
        <button
          key={locale}
          onClick={() => {
            handleChange(locale);
          }}
          className={getButtonClassName(locale, currentLocale)}
          disabled={currentLocale === locale}
        >
          {t(locale)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
