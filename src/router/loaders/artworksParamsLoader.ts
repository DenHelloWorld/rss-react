import { type LoaderFunctionArgs, redirect } from 'react-router';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const.ts';
import {
  localStorageService,
  STORAGE_KEYS,
} from '../../services/localStorageService/local-storage.service.ts';

export const artworksParamsLoader = ({
  request,
}: LoaderFunctionArgs): Response | null => {
  const url = new URL(request.url);
  const query = url.searchParams.get(ROUTE_QUERY_PARAMS.QUERY);
  const page = url.searchParams.get(ROUTE_QUERY_PARAMS.PAGE);
  const storedSearchTerm = localStorageService.getItem(
    STORAGE_KEYS.SEARCH_TERM
  );

  if (!query && storedSearchTerm) {
    url.searchParams.set(ROUTE_QUERY_PARAMS.QUERY, storedSearchTerm);
    url.searchParams.set(ROUTE_QUERY_PARAMS.PAGE, '1');
    return redirect(url.pathname + url.search);
  }

  if (!page) {
    url.searchParams.set(ROUTE_QUERY_PARAMS.PAGE, '1');
    return redirect(url.pathname + url.search);
  }

  return null;
};
