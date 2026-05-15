import { useState, useCallback } from 'react';
import {
  localStorageService,
  type StorageSchema,
} from '../services/local-storage.service.ts';

export function useLocalStorage<K extends keyof StorageSchema>(
  key: K
): readonly [
  StorageSchema[K] | null,
  (value: StorageSchema[K]) => void,
  () => void,
] {
  const [storedValue, setStoredValue] = useState<StorageSchema[K] | null>(() =>
    localStorageService.getItem(key)
  );

  const setValue = useCallback(
    (value: StorageSchema[K]) => {
      localStorageService.setItem(key, value);
      setStoredValue(value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    localStorageService.removeItem(key);
    setStoredValue(null);
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
}
