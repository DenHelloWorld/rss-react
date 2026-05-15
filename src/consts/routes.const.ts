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

export const ROUTE_QUERY_PARAMS = {
  QUERY: 'query',
  PAGE: 'page',
} as const;
