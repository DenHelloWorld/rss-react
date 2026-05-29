import { http, HttpResponse } from 'msw';
import type { HttpHandler } from 'msw';
import { MOCK_ART, MOCK_DETAILS, MOCK_PAGINATION } from './mock-data.ts';
import { type SetupServer, setupServer } from 'msw/node';
import type { AICResponse } from '../store/arts/arts-api.ts';
import { API_URL } from '../store/arts/arts-api.ts';

const mockListResponse = () => {
  const mockData: AICResponse = {
    data: [MOCK_ART],
    pagination: MOCK_PAGINATION,
  };
  return HttpResponse.json(mockData);
};

const AICHandlers: HttpHandler[] = [
  http.get(API_URL.baseURL, mockListResponse),
  http.get(`${API_URL.baseURL}/search`, mockListResponse),
  http.get(`${API_URL.baseURL}/:id`, ({ params }) => {
    return HttpResponse.json({
      data: { ...MOCK_DETAILS, id: Number(params.id) },
    });
  }),
];

export const AICServerMock: SetupServer = setupServer(...AICHandlers);
