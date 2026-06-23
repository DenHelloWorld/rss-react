import { useCallback } from 'react';
import type { AICArtwork } from '../../store/arts/arts-api.ts';
import { API_ROUTES } from '../../consts/routes.const.ts';
import { downloadBlob } from '../../utils/csv/csv.ts';

export const useArtworksDownload = (): {
  downloadAsCsv: (items: AICArtwork[]) => void;
} => {
  const downloadAsCsv = useCallback((items: AICArtwork[]) => {
    if (items.length) {
      fetch(API_ROUTES.DOWNLOAD_CSV, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
        .then((res) => res.blob())
        .then((blob) => {
          downloadBlob(blob, `${String(items.length)}_artworks.csv`);
        })
        .catch((error: unknown) => {
          console.error('Failed to generate or download CSV:', error);
        });
    }
  }, []);

  return { downloadAsCsv };
};
