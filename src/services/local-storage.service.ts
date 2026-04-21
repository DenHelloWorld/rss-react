export const STORAGE_KEYS = {
  SEARCH_TERM: 'search_term',
} as const;

export type StorageKeyType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

class LocalStorageService {
  setItem<T>(key: StorageKeyType, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Error saving to localStorage', error);
    }
  }

  getItem<T>(key: StorageKeyType): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn('Error reading from localStorage', error);
      return null;
    }
  }

  removeItem(key: StorageKeyType): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Error removing from localStorage', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Error clearing localStorage', error);
    }
  }
}

export const localStorageService = new LocalStorageService();
