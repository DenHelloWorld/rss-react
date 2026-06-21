import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { AICArtwork } from '../../../store/arts/arts-api.ts';
import { ARTWORK_COLUMNS, generateCSV } from '../../../utils/csv/csv.ts';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const items = (await request.json()) as AICArtwork[];
  const csv = generateCSV(items, ARTWORK_COLUMNS);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv;charset=utf-8;',
      'Content-Disposition': `attachment; filename="${String(items.length)}_artworks.csv"`,
    },
  });
};
