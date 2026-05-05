export const STORAGE_KEYS = {
  SEARCH_TERM: 'search_term',
} as const;

export interface StorageSchema {
  [STORAGE_KEYS.SEARCH_TERM]: string;
}

export type StorageKeyType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

class LocalStorageService {
  setItem<K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Error saving to localStorage', error);
    }
  }

  getItem<T extends keyof StorageSchema>(key: T): StorageSchema[T] | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as StorageSchema[T];
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
