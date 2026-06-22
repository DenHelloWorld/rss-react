'use server';

import { ROUTE_QUERY_PARAMS } from '../consts/routes.const';

export const searchAction = async (
  _prevState: string,
  formData: FormData
): Promise<string> => {
  const raw = formData.get(ROUTE_QUERY_PARAMS.QUERY);
  const query = (typeof raw === 'string' ? raw : '').trim();
  const pathnameRaw = formData.get('pathname');
  const pathname = typeof pathnameRaw === 'string' ? pathnameRaw : '/';

  const params = new URLSearchParams();
  if (query) params.set(ROUTE_QUERY_PARAMS.QUERY, query);
  params.set(ROUTE_QUERY_PARAMS.PAGE, '1');

  return `${pathname}?${params}`;
};
