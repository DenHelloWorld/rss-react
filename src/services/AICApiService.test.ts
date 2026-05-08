import { describe, it, expect } from 'vitest';
import { http, HttpResponse, type HttpHandler } from 'msw';
import { AICApiService } from './AICApiService';
import { AICServerMock } from '../test-utils/server.ts';
import { MOCK_ART } from '../test-utils/mock-data.ts';

describe('AICApiService', () => {
  describe('search method', () => {
    it('should return a list of artworks from the API', async () => {
      const result = await AICApiService.search('Monet');

      expect(result.data).toBeInstanceOf(Array);
      expect(result.data[0].title).toBe(MOCK_ART.title);
      expect(result.data[0].id).toBe(MOCK_ART.id);
    });

    it('should throw an error when the API returns a 500 status (Feature 5)', async () => {
      const errorHandler: HttpHandler = http.get(
        'https://api.artic.edu/api/v1/artworks/*',
        () => {
          return new HttpResponse(null, { status: 500 });
        }
      );

      AICServerMock.use(errorHandler);

      await expect(AICApiService.search('error')).rejects.toThrow(
        'Network response was not ok'
      );
    });
  });

  it('should handle undefined query correctly', async () => {
    const result = await AICApiService.search(undefined);

    expect(result.data).toBeInstanceOf(Array);
  });

  describe('getImageUrl method', () => {
    it('should correctly format the image URL using the provided ID', () => {
      const testId = 'sample-image-id';
      const expectedUrl = `https://www.artic.edu/iiif/2/${testId}/full/843,/0/default.jpg`;

      const result = AICApiService.getImageUrl(testId);

      expect(result).toBe(expectedUrl);
    });
  });
});
