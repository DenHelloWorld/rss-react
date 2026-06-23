/**
 * Named "middleware.ts" instead of "proxy.ts" (Next.js 16 convention) intentionally:
 * proxy.ts is not picked up in Vercel production builds due to a Next.js bug.
 * @see https://github.com/vercel/next.js/issues/85243
 */
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const middleware = (request: NextRequest): NextResponse => {
  return intlMiddleware(request);
};

export default middleware;

export const config = {
  matcher: ['/', '/details/:path*', '/(en|ru)', '/(en|ru)/:path*'],
};
