import { NextResponse, type NextRequest } from 'next/server';
import {
  ROUTE_QUERY_PARAMS,
  isPositiveIntegerString,
} from './consts/routes.const';
import { COOKIE_KEYS } from './utils/cookie-storage/cookie-storage';

/**
 * TODO: Feature 9 — once the search page becomes a server component,
 * searchParams will arrive as props and the page-validation redirect can be removed.
 * Only the cookie → query redirect will remain.
 */
export const proxy = (request: NextRequest): NextResponse => {
  const url = request.nextUrl.clone();

  if (url.pathname !== '/') {
    return NextResponse.next();
  }

  const query = url.searchParams.get(ROUTE_QUERY_PARAMS.QUERY);
  const page = url.searchParams.get(ROUTE_QUERY_PARAMS.PAGE);
  const storedSearchTerm = request.cookies.get(COOKIE_KEYS.SEARCH_TERM)?.value;

  if (!query && storedSearchTerm) {
    url.searchParams.set(ROUTE_QUERY_PARAMS.QUERY, storedSearchTerm);
    url.searchParams.set(ROUTE_QUERY_PARAMS.PAGE, '1');
    return NextResponse.redirect(url);
  }

  if (!page || !isPositiveIntegerString(page)) {
    url.searchParams.set(ROUTE_QUERY_PARAMS.PAGE, '1');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/details/:path*'],
};
