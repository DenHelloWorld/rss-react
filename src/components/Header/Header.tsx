import { getTranslations } from 'next-intl/server';
import { ROUTES } from '../../consts/routes.const';
import ThemeButtonDynamic from '../ThemeButton/ThemeButtonDynamic';
import ErrorTrigger from '../ErrorTrigger/ErrorTrigger';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import NavLink from '../NavLink/NavLink';
import HeaderSearch from './HeaderSearch';
import type { Locale } from '../../consts/locales.const';

type Props = { locale: Locale };

const Header = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: 'Header' });

  return (
    <header className="header">
      <div className="header-container">
        <nav className="navigation">
          <NavLink
            href={ROUTES.ROOT.path}
            activeFor={[ROUTES.ROOT.path, `/${ROUTES.DETAILS.path}`]}
          >
            {t('home')}
          </NavLink>
          <NavLink href={`/${ROUTES.ABOUT.path}`}>{t('about')}</NavLink>
          <LanguageSwitcher />
          <ThemeButtonDynamic />
          <ErrorTrigger />
        </nav>

        <HeaderSearch />
      </div>
    </header>
  );
};

export default Header;
