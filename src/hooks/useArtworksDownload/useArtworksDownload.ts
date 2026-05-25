import { useCallback } from 'react';
import type { AICArtwork } from '../../services/AICApiService/aic-api-service.ts';
import {
  ARTWORK_COLUMNS,
  CSVService,
} from '../../services/CSVService/csv-service.ts';

export const useArtworksDownload = (): {
  downloadAsCsv: (items: AICArtwork[]) => void;
} => {
  const downloadAsCsv = useCallback((items: AICArtwork[]) => {
    if (items.length) {
      try {
        const csvContent = CSVService.generateCSV(items, ARTWORK_COLUMNS);

        const blob = new Blob(['\uFEFF' + csvContent], {
          type: 'text/csv;charset=utf-8;',
        });

        CSVService.downloadBlob(blob, `${String(items.length)}_artworks.csv`);
      } catch (error) {
        console.error('Failed to generate or download CSV:', error);
      }
    }
  }, []);

  return { downloadAsCsv };
};
