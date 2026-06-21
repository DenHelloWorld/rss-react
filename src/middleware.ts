/**
 * Named "middleware.ts" instead of "proxy.ts" (Next.js 16 convention) intentionally:
 * proxy.ts is not picked up in Vercel production builds due to a Next.js bug.
 * @see https://github.com/vercel/next.js/issues/85243
 */
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import {
  ROUTE_QUERY_PARAMS,
  isPositiveIntegerString,
} from './consts/routes.const';
import { LOCALES } from './consts/locales.const';

const intlMiddleware = createMiddleware(routing);

const localizedRoots = new Set(Object.values(LOCALES).map((l) => `/${l}`));

const isPageParamMissing = (request: NextRequest): boolean => {
  const page = request.nextUrl.searchParams.get(ROUTE_QUERY_PARAMS.PAGE);
  return !page || !isPositiveIntegerString(page);
};

const redirectWithPage = (request: NextRequest): NextResponse => {
  const url = request.nextUrl.clone();
  url.searchParams.set(ROUTE_QUERY_PARAMS.PAGE, '1');
  return NextResponse.redirect(url);
};

const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;

  if (localizedRoots.has(pathname) && isPageParamMissing(request)) {
    return redirectWithPage(request);
  }

  return intlMiddleware(request);
};

export default middleware;

export const config = {
  matcher: ['/', '/details/:path*', '/(en|ru)', '/(en|ru)/:path*'],
};
