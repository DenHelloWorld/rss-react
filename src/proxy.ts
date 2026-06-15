import { NextResponse, type NextRequest } from 'next/server';
import {
  ROUTE_QUERY_PARAMS,
  isPositiveIntegerString,
} from './consts/routes.const';

export const proxy = (request: NextRequest): NextResponse => {
  const url = request.nextUrl.clone();

  if (url.pathname !== '/') {
    return NextResponse.next();
  }

  const page = url.searchParams.get(ROUTE_QUERY_PARAMS.PAGE);

  if (!page || !isPositiveIntegerString(page)) {
    url.searchParams.set(ROUTE_QUERY_PARAMS.PAGE, '1');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/details/:path*'],
};
