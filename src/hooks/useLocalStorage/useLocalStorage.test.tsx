import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage.ts';
import {
  localStorageService,
  STORAGE_KEYS,
} from '../../services/localStorageService/local-storage.service.ts';

describe('useLocalStorage', () => {
  const getItemSpy = vi.spyOn(localStorageService, 'getItem');
  const setItemSpy = vi.spyOn(localStorageService, 'setItem');
  const removeItemSpy = vi.spyOn(localStorageService, 'removeItem');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with value from localStorageService', () => {
    const mockValue = 'Monet';
    getItemSpy.mockReturnValue(mockValue);

    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.SEARCH_TERM)
    );

    expect(result.current[0]).toBe(mockValue);
    expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM);
  });

  it('should update value and call localStorageService.setItem', () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.SEARCH_TERM)
    );
    const newValue = 'Van Gogh';

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM, newValue);
  });

  it('should remove value and call localStorageService.removeItem', () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.SEARCH_TERM)
    );

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeNull();
    expect(removeItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM);
  });
});
