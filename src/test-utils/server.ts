import { http, HttpResponse } from 'msw';
import type { HttpHandler } from 'msw';
import { MOCK_ART } from './mock-data.ts';
import { type SetupServer, setupServer } from 'msw/node';
import type { AICResponse } from '../services/AICApiService.ts';

const AICHandlers: HttpHandler[] = [
  http.get('https://api.artic.edu/api/v1/artworks/*', () => {
    const mockData: AICResponse = { data: [MOCK_ART] };

    return HttpResponse.json(mockData);
  }),
];

export const AICServerMock: SetupServer = setupServer(...AICHandlers);
