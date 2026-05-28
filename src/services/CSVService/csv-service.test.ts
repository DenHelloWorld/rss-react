import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CSVService, ARTWORK_COLUMNS } from './csv-service.ts';
import {
  getArtworkImageUrl,
  type AICArtwork,
} from '../../store/arts/arts-api.ts';
import { MOCK_ART } from '../../test-utils/mock-data.ts';

describe('CSVService', () => {
  describe('escapeValue', () => {
    it('should return empty quoted string for null', () => {
      expect(CSVService.escapeValue(null)).toBe('""');
    });

    it('should return empty quoted string for undefined', () => {
      expect(CSVService.escapeValue(undefined)).toBe('""');
    });

    it('should wrap string in quotes', () => {
      expect(CSVService.escapeValue('hello')).toBe('"hello"');
    });

    it('should escape double quotes', () => {
      expect(CSVService.escapeValue('he"llo')).toBe('"he""llo"');
    });

    it('should wrap value containing comma in quotes', () => {
      expect(CSVService.escapeValue('hello, world')).toBe('"hello, world"');
    });

    it('should wrap value containing semicolon in quotes', () => {
      expect(CSVService.escapeValue('hello; world')).toBe('"hello; world"');
    });

    it('should replace newlines with spaces', () => {
      expect(CSVService.escapeValue('hello\nworld')).toBe('"hello world"');
    });

    it('should handle numbers', () => {
      expect(CSVService.escapeValue(42)).toBe('"42"');
    });

    it('should handle booleans', () => {
      expect(CSVService.escapeValue(true)).toBe('"true"');
    });
  });

  describe('generateCSV', () => {
    it('should return empty string for empty items', () => {
      expect(CSVService.generateCSV([], ARTWORK_COLUMNS)).toBe('');
    });

    it('should generate CSV with headers and rows', () => {
      const result = CSVService.generateCSV([MOCK_ART], ARTWORK_COLUMNS);

      expect(result).toContain('"ID"');
      expect(result).toContain('"Title"');
      expect(result).toContain(MOCK_ART.title);
      expect(result).toContain(String(MOCK_ART.id));
    });
  });

  describe('downloadBlob', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should create a link element, trigger click, and clean up', async () => {
      const createObjectURL = vi
        .spyOn(URL, 'createObjectURL')
        .mockReturnValue('blob:test');
      const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL');

      const blob = new Blob(['test'], { type: 'text/csv' });
      CSVService.downloadBlob(blob, 'test.csv');

      expect(createObjectURL).toHaveBeenCalledWith(blob);
      const link = document.querySelector('a');

      expect(link).toBeInTheDocument();
      expect(link?.href).toBe('blob:test');
      expect(link?.download).toBe('test.csv');

      await vi.waitFor(() => {
        expect(document.querySelector('a')).not.toBeInTheDocument();
      });
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:test');
    });
  });
});

describe('ARTWORK_COLUMNS', () => {
  it('should extract ID correctly', () => {
    expect(ARTWORK_COLUMNS[0].getValue(MOCK_ART)).toBe(MOCK_ART.id);
  });

  it('should extract Title correctly', () => {
    expect(ARTWORK_COLUMNS[1].getValue(MOCK_ART)).toBe(MOCK_ART.title);
  });

  it('should extract Artist Display correctly', () => {
    expect(ARTWORK_COLUMNS[2].getValue(MOCK_ART)).toBe(MOCK_ART.artist_display);
  });

  it('should use thumbnail alt_text for Description when available', () => {
    expect(ARTWORK_COLUMNS[3].getValue(MOCK_ART)).toBe(
      MOCK_ART.thumbnail!.alt_text
    );
  });

  it('should fall back to artist_display for Description when alt_text is missing', () => {
    const artWithoutAlt: AICArtwork = {
      ...MOCK_ART,
      thumbnail: undefined,
    };
    expect(ARTWORK_COLUMNS[3].getValue(artWithoutAlt)).toBe(
      MOCK_ART.artist_display
    );
  });

  it('should generate image URL for Art Photo when image_id exists', () => {
    const url = ARTWORK_COLUMNS[4].getValue(MOCK_ART) as string;
    expect(url).toBe(getArtworkImageUrl(MOCK_ART.image_id!));
  });

  it('should return fallback text for Art Photo when image_id is missing', () => {
    const artWithoutImage: AICArtwork = {
      ...MOCK_ART,
      image_id: null,
    };
    expect(ARTWORK_COLUMNS[4].getValue(artWithoutImage)).toBe(
      'No Image Available'
    );
  });
});
