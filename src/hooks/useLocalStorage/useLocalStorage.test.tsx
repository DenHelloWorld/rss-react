import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage.ts';
import {
  getItem,
  setItem,
  removeItem,
  STORAGE_KEYS,
} from '../../utils/local-storage/local-storage.ts';

vi.mock('../../utils/local-storage/local-storage.ts', () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  STORAGE_KEYS: { SEARCH_TERM: 'search_term', THEME: 'theme' },
}));

const getItemMock = vi.mocked(getItem);
const setItemMock = vi.mocked(setItem);
const removeItemMock = vi.mocked(removeItem);

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with value from localStorageService', () => {
    const mockValue = 'Monet';
    getItemMock.mockReturnValue(mockValue);

    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.SEARCH_TERM)
    );

    expect(result.current[0]).toBe(mockValue);
    expect(getItemMock).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM);
  });

  it('should update value and call setItem', () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.SEARCH_TERM)
    );
    const newValue = 'Van Gogh';

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
    expect(setItemMock).toHaveBeenCalledWith(
      STORAGE_KEYS.SEARCH_TERM,
      newValue
    );
  });

  it('should remove value and call removeItem', () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.SEARCH_TERM)
    );

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeNull();
    expect(removeItemMock).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM);
  });
});
