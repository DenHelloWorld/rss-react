import { http, HttpResponse } from 'msw';
import type { HttpHandler } from 'msw';
import { MOCK_ART, MOCK_PAGINATION } from './mock-data.ts';
import { type SetupServer, setupServer } from 'msw/node';
import type { AICResponse } from '../store/arts/arts-api.ts';
import { API_URL } from '../store/arts/arts-api.ts';

const mockResponse = () => {
  const mockData: AICResponse = {
    data: [MOCK_ART],
    pagination: MOCK_PAGINATION,
  };
  return HttpResponse.json(mockData);
};

const AICHandlers: HttpHandler[] = [
  http.get(API_URL.baseURL, mockResponse),
  http.get(`${API_URL.baseURL}/:path*`, mockResponse),
];

export const AICServerMock: SetupServer = setupServer(...AICHandlers);
