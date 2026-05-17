import { useCallback } from 'react';
import type { AICArtwork } from '../services/AICApiService.ts';

export const useArtworksDownload = () => {
  const downloadAsCsv = useCallback((items: AICArtwork[]) => {
    if (!items.length) {
      return;
    }

    const headers = ['ID', 'Title', 'Artist Display', 'Alternative Text'];

    const escapeCsvValue = (
      value: string | number | null | undefined
    ): string => {
      if (value === null || value === undefined) return '""';
      const stringValue = String(value)
        .replace(/[\n\r]+/g, ' ')
        .replace(/"/g, '""');

      return `"${stringValue}"`;
    };

    const rows = items.map((item) =>
      [
        escapeCsvValue(item.id),
        escapeCsvValue(item.title),
        escapeCsvValue(item.artist_display),

        escapeCsvValue(item.thumbnail?.alt_text),
      ].join(',')
    );
    const content = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + content], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${String(items.length)}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { downloadAsCsv };
};
