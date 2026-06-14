import { useCallback } from 'react';
import type { AICArtwork } from '../../store/arts/arts-api.ts';
import {
  ARTWORK_COLUMNS,
  generateCSV,
  downloadBlob,
} from '../../utils/csv/csv.ts';

export const useArtworksDownload = (): {
  downloadAsCsv: (items: AICArtwork[]) => void;
} => {
  const downloadAsCsv = useCallback((items: AICArtwork[]) => {
    if (items.length) {
      try {
        const csvContent = generateCSV(items, ARTWORK_COLUMNS);

        const blob = new Blob(['\uFEFF' + csvContent], {
          type: 'text/csv;charset=utf-8;',
        });

        downloadBlob(blob, `${String(items.length)}_artworks.csv`);
      } catch (error) {
        console.error('Failed to generate or download CSV:', error);
      }
    }
  }, []);

  return { downloadAsCsv };
};
