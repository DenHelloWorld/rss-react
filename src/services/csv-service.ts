import type { AICArtwork } from './AICApiService.ts';

export interface CSVColumn<T> {
  header: string;
  getValue: (item: T) => string | number | boolean | null | undefined;
}

export const ARTWORK_COLUMNS: CSVColumn<AICArtwork>[] = [
  { header: 'ID', getValue: (item) => item.id },
  { header: 'Title', getValue: (item) => item.title },
  { header: 'Artist Display', getValue: (item) => item.artist_display },
  { header: 'Alternative Text', getValue: (item) => item.thumbnail?.alt_text },
];

export const CSVService = {
  /**
   * Sanitizes and formats a single cell value to comply with the CSV standard,
   * preventing the output from breaking when opened in Excel.
   */
  escapeValue(value: string | number | boolean | null | undefined): string {
    if (value === null || value === undefined) return '""';

    const cleanString = String(value).replace(/[\r\n]+/g, ' ');

    if (
      cleanString.includes('"') ||
      cleanString.includes(',') ||
      cleanString.includes(';')
    ) {
      return `"${cleanString.replace(/"/g, '""')}"`;
    }

    return `"${cleanString}"`;
  },

  /**
   * Converts an array of generic items into a single, structured CSV string based on provided columns.
   */
  generateCSV<T>(items: T[], columns: CSVColumn<T>[]): string {
    if (!items.length) return '';

    const headers = columns
      .map((col) => this.escapeValue(col.header))
      .join(',');

    const rows = items.map((item) =>
      columns.map((col) => this.escapeValue(col.getValue(item))).join(',')
    );

    return [headers, ...rows].join('\n');
  },

  /**
   * Creates a virtual file in the browser's memory and programmatically triggers a user download.
   */
  downloadBlob(blob: Blob, filename: string): void {
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
  },
};
