import { describe, it, expect, vi, afterEach } from 'vitest';
import { localStorageService, STORAGE_KEYS } from './local-storage.service.ts';
import { CONSOLE_WARN_SPY } from '../../test-utils/console-spies.const.ts';

describe('LocalStorageService', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('setItem', () => {
    it('should successfully save item to localStorage as JSON string', () => {
      const testData = 'Monet';

      localStorageService.setItem(STORAGE_KEYS.SEARCH_TERM, testData);

      expect(localStorage.getItem(STORAGE_KEYS.SEARCH_TERM)).toBe(
        JSON.stringify(testData)
      );
      expect(CONSOLE_WARN_SPY).not.toHaveBeenCalled();
    });

    it('should log warning if setItem throws', () => {
      const mockSetItem = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('QuotaExceededError');
        });

      localStorageService.setItem(STORAGE_KEYS.SEARCH_TERM, 'some-data');

      expect(CONSOLE_WARN_SPY).toHaveBeenCalledWith(
        'Error saving to localStorage',
        expect.any(Error)
      );

      mockSetItem.mockRestore();
    });
  });

  describe('getItem', () => {
    it('should return parsed value if it exists', () => {
      const data = 'Van Gogh';
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, JSON.stringify(data));

      const result = localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM);

      expect(result).toBe(data);
      expect(CONSOLE_WARN_SPY).not.toHaveBeenCalled();
    });

    it('should return null if item does not exist', () => {
      const result = localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM);

      expect(result).toBeNull();
      expect(CONSOLE_WARN_SPY).not.toHaveBeenCalled();
    });

    it('should return null and log warning if JSON.parse fails', () => {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, 'invalid-json-{');

      const result = localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM);

      expect(result).toBeNull();
      expect(CONSOLE_WARN_SPY).toHaveBeenCalledWith(
        'Error reading from localStorage',
        expect.any(Error)
      );
    });

    it('should return null and log warning if localStorage contains an empty string', () => {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, '');

      const result = localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM);

      expect(result).toBeNull();
      expect(CONSOLE_WARN_SPY).toHaveBeenCalledWith(
        'Error reading from localStorage',
        expect.any(Error)
      );
    });

    it('should correctly parse and return an empty object if it is stored', () => {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, JSON.stringify({}));

      const result = localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM);

      expect(result).toEqual({});
      expect(CONSOLE_WARN_SPY).not.toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, JSON.stringify('test'));

      localStorageService.removeItem(STORAGE_KEYS.SEARCH_TERM);

      expect(localStorage.getItem(STORAGE_KEYS.SEARCH_TERM)).toBeNull();
    });

    it('should log warning if removeItem throws', () => {
      const mockRemove = vi
        .spyOn(Storage.prototype, 'removeItem')
        .mockImplementation(() => {
          throw new Error('Remove error');
        });

      localStorageService.removeItem(STORAGE_KEYS.SEARCH_TERM);

      expect(CONSOLE_WARN_SPY).toHaveBeenCalledWith(
        'Error removing from localStorage',
        expect.any(Error)
      );

      mockRemove.mockRestore();
    });
  });

  describe('clear', () => {
    it('should clear all items from localStorage', () => {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, JSON.stringify('test'));

      localStorageService.clear();

      expect(localStorage.length).toBe(0);
    });

    it('should log warning if clear throws', () => {
      const mockClear = vi
        .spyOn(Storage.prototype, 'clear')
        .mockImplementation(() => {
          throw new Error('Clear error');
        });

      localStorageService.clear();

      expect(CONSOLE_WARN_SPY).toHaveBeenCalledWith(
        'Error clearing localStorage',
        expect.any(Error)
      );

      mockClear.mockRestore();
    });
  });
});
