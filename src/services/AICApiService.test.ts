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

  describe('getById method', () => {
    it('should return artwork details when successful', async () => {
      const mockId = '123';
      const mockData = {
        data: {
          id: 123,
          title: 'Test Artwork',
          artist_display: 'Test Artist',
        },
      };

      AICServerMock.use(
        http.get('https://api.artic.edu/api/v1/artworks/123', () => {
          return HttpResponse.json(mockData);
        })
      );

      const result = await AICApiService.getById(mockId);
      expect(result.data.title).toBe('Test Artwork');
      expect(result.data.id).toBe(123);
    });

    it('should throw "Artwork not found" when status is 404', async () => {
      AICServerMock.use(
        http.get('https://api.artic.edu/api/v1/artworks/999', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(AICApiService.getById('999')).rejects.toThrow(
        'Artwork not found'
      );
    });

    it('should throw "Failed to fetch artwork details" for other error statuses', async () => {
      AICServerMock.use(
        http.get('https://api.artic.edu/api/v1/artworks/500', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(AICApiService.getById('500')).rejects.toThrow(
        'Failed to fetch artwork details'
      );
    });
  });
});
