import { useLocation } from 'react-router';
import { ROUTES } from '../../consts/routes.const.ts';

export const useIsHomeActive = (): boolean => {
  const location = useLocation();

  const isHome = location.pathname === ROUTES.ROOT.path;
  const isDetails = location.pathname.startsWith(`/${ROUTES.DETAILS.path}`);

  return isHome || isDetails;
};
