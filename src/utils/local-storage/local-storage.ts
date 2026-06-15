export const STORAGE_KEYS = {
  EXAMPLE: 'example',
  SEARCH_TERM: 'search_term',
  THEME: 'theme',
} as const;

export type StorageSchema = {
  [STORAGE_KEYS.EXAMPLE]: string;
  [STORAGE_KEYS.SEARCH_TERM]: string;
  [STORAGE_KEYS.THEME]: string;
};

export type StorageKeyType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

const isClient = typeof window !== 'undefined';

export function setItem<K extends keyof StorageSchema>(
  key: K,
  value: StorageSchema[K]
): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Error saving to localStorage', error);
  }
}

export function getItem<T extends keyof StorageSchema>(
  key: T
): StorageSchema[T] | null {
  if (!isClient) return null;
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as StorageSchema[T];
  } catch (error) {
    console.warn('Error reading from localStorage', error);
    return null;
  }
}

export function removeItem(key: StorageKeyType): void {
  if (!isClient) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Error removing from localStorage', error);
  }
}

export function clearStorage(): void {
  if (!isClient) return;
  try {
    localStorage.clear();
  } catch (error) {
    console.warn('Error clearing localStorage', error);
  }
}
