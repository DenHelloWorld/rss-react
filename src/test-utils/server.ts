import { http, HttpResponse } from 'msw';
import type { HttpHandler } from 'msw';
import { MOCK_ART, MOCK_PAGINATION } from './mock-data.ts';
import { type SetupServer, setupServer } from 'msw/node';
import type { AICResponse } from '../services/AICApiService/aic-api-service.ts';

const AICHandlers: HttpHandler[] = [
  http.get('https://api.artic.edu/api/v1/artworks/*', () => {
    const mockData: AICResponse = {
      data: [MOCK_ART],
      pagination: MOCK_PAGINATION,
    };

    return HttpResponse.json(mockData);
  }),
];

export const AICServerMock: SetupServer = setupServer(...AICHandlers);
