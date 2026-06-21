export const ROUTES = {
  ABOUT: {
    path: 'about',
    label: 'About',
  },
  ROOT: {
    path: '/',
    label: 'Home',
  },
  DETAILS: {
    path: 'details',
    label: 'Details',
  },
} as const;

export const API_ROUTES = {
  DOWNLOAD_CSV: '/api/download-csv',
} as const;

export const ROUTE_QUERY_PARAMS = {
  QUERY: 'query',
  PAGE: 'page',
} as const;

export const isPositiveIntegerString = (value: string): boolean =>
  /^[1-9]\d*$/.test(value);
