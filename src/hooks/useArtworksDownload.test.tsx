import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useArtworksDownload } from './useArtworksDownload.ts';
import { CSVService } from '../services/csv-service.ts';
import { MOCK_ART } from '../test-utils/mock-data.ts';
import { CONSOLE_ERROR_SPY } from '../test-utils/console-spies.const.ts';

describe('useArtworksDownload', () => {
  const mockArtworks = [MOCK_ART];

  it('should return downloadAsCsv function', () => {
    const { result } = renderHook(() => useArtworksDownload());
    expect(result.current.downloadAsCsv).toBeInstanceOf(Function);
  });

  it('should generate CSV and trigger download when items are provided', () => {
    const generateCSVSpy = vi.spyOn(CSVService, 'generateCSV');
    const downloadBlobSpy = vi.spyOn(CSVService, 'downloadBlob');

    const { result } = renderHook(() => useArtworksDownload());
    result.current.downloadAsCsv(mockArtworks);

    expect(generateCSVSpy).toHaveBeenCalledTimes(1);
    expect(downloadBlobSpy).toHaveBeenCalledTimes(1);

    const blobArg = downloadBlobSpy.mock.calls[0][0];
    expect(blobArg).toBeInstanceOf(Blob);
    expect(blobArg.type).toBe('text/csv;charset=utf-8;');

    const filenameArg = downloadBlobSpy.mock.calls[0][1];
    expect(filenameArg).toBe('1_artworks.csv');

    generateCSVSpy.mockRestore();
    downloadBlobSpy.mockRestore();
  });

  it('should not generate CSV or download when items array is empty', () => {
    const generateCSVSpy = vi.spyOn(CSVService, 'generateCSV');
    const downloadBlobSpy = vi.spyOn(CSVService, 'downloadBlob');

    const { result } = renderHook(() => useArtworksDownload());
    result.current.downloadAsCsv([]);

    expect(generateCSVSpy).not.toHaveBeenCalled();
    expect(downloadBlobSpy).not.toHaveBeenCalled();

    generateCSVSpy.mockRestore();
    downloadBlobSpy.mockRestore();
  });

  it('should handle errors gracefully when CSV generation fails', () => {
    const generateCSVSpy = vi
      .spyOn(CSVService, 'generateCSV')
      .mockImplementation(() => {
        throw new Error('Generation failed');
      });

    const { result } = renderHook(() => useArtworksDownload());
    expect(() => {
      result.current.downloadAsCsv(mockArtworks);
    }).not.toThrow();

    expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith(
      'Failed to generate or download CSV:',
      expect.any(Error)
    );

    generateCSVSpy.mockRestore();
  });
});
