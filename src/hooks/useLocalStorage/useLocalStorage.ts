import { useState, useCallback } from 'react';
import {
  getItem,
  setItem,
  removeItem,
  type StorageSchema,
} from '../../utils/local-storage/local-storage.ts';

export const useLocalStorage = <K extends keyof StorageSchema>(
  key: K
): readonly [
  StorageSchema[K] | null,
  (value: StorageSchema[K]) => void,
  () => void,
] => {
  const [storedValue, setStoredValue] = useState<StorageSchema[K] | null>(() =>
    getItem(key)
  );

  const setValue = useCallback(
    (value: StorageSchema[K]) => {
      setItem(key, value);
      setStoredValue(value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    removeItem(key);
    setStoredValue(null);
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
};
