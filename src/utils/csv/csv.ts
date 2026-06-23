import type { AICArtwork } from '../../store/arts/arts-api.ts';
import { getArtworkImageUrl } from '../../store/arts/arts-api.ts';

export type CSVColumn<T> = {
  header: string;
  getValue: (item: T) => string | number | boolean | null | undefined;
};

export const ARTWORK_COLUMNS: CSVColumn<AICArtwork>[] = [
  { header: 'ID', getValue: (item) => item.id },
  { header: 'Title', getValue: (item) => item.title },
  { header: 'Artist Display', getValue: (item) => item.artist_display },
  {
    header: 'Description',
    getValue: (item) => item.thumbnail?.alt_text ?? item.artist_display,
  },
  {
    header: 'Art Photo',
    getValue: (item) =>
      item.image_id ? getArtworkImageUrl(item.image_id) : 'No Image Available',
  },
];

export const escapeValue = (
  value: string | number | boolean | null | undefined
): string => {
  if (value === null || value === undefined) return '""';

  const cleanString = String(value).replace(/[\r\n]+/g, ' ');

  if (cleanString.includes('"') || cleanString.includes(';')) {
    return `"${cleanString.replace(/"/g, '""')}"`;
  }

  return `"${cleanString}"`;
};

export const generateCSV = <T>(items: T[], columns: CSVColumn<T>[]): string => {
  if (!items.length) return '';

  const headers = columns.map((col) => escapeValue(col.header)).join(';');

  const rows = items.map((item) =>
    columns.map((col) => escapeValue(col.getValue(item))).join(';')
  );

  return [headers, ...rows].join('\n');
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  if (typeof window === 'undefined') return;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
