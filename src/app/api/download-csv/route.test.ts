import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route.ts';
import { API_ROUTES } from '../../../consts/routes.const.ts';
import { MOCK_ART } from '../../../test-utils/mocks/mock-data.ts';

describe('POST /api/download-csv', () => {
  const makeRequest = (body: unknown) =>
    new NextRequest(`http://localhost${API_ROUTES.DOWNLOAD_CSV}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

  it('should return 200 with text/csv content type', async () => {
    const res = await POST(makeRequest([MOCK_ART]));
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('text/csv;charset=utf-8;');
  });

  it('should return correct Content-Disposition filename', async () => {
    const res = await POST(makeRequest([MOCK_ART]));
    expect(res.headers.get('Content-Disposition')).toBe(
      'attachment; filename="1_artworks.csv"'
    );
  });

  it('should include CSV headers and artwork data in body', async () => {
    const res = await POST(makeRequest([MOCK_ART]));
    const text = await res.text();

    expect(text).toContain('"ID"');
    expect(text).toContain('"Title"');
    expect(text).toContain(String(MOCK_ART.id));
    expect(text).toContain(MOCK_ART.title);
  });

  it('should return empty body for empty items array', async () => {
    const res = await POST(makeRequest([]));
    const text = await res.text();
    expect(text).toBe('');
  });

  it('should reflect item count in filename for multiple items', async () => {
    const items = [MOCK_ART, { ...MOCK_ART, id: 456 }];
    const res = await POST(makeRequest(items));
    expect(res.headers.get('Content-Disposition')).toBe(
      'attachment; filename="2_artworks.csv"'
    );
  });
});
