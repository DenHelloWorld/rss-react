import { useState, useCallback } from 'react';
import {
  getItem,
  setItem,
  removeItem,
  type CookieSchema,
} from '../../utils/cookie-storage/cookie-storage';

export const useCookies = <K extends keyof CookieSchema>(
  key: K
): readonly [
  CookieSchema[K] | null,
  (value: CookieSchema[K]) => void,
  () => void,
] => {
  const [storedValue, setStoredValue] = useState<CookieSchema[K] | null>(() =>
    getItem(key)
  );

  const setValue = useCallback(
    (value: CookieSchema[K]) => {
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
