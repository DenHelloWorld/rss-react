import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useArtworkSelection } from './useArtworkSelection.ts';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import artsReducer from '../store/arts/arts-slice.ts';
import type { ReactNode } from 'react';
import type { AICArtwork } from '../services/AICApiService/aic-api-service.ts';
import { MOCK_ART } from '../test-utils/mock-data.ts';

const createTestStore = () =>
  configureStore({
    reducer: { arts: artsReducer },
  });

const wrapper = (testStore: ReturnType<typeof createTestStore>) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={testStore}>{children}</Provider>;
  };

describe('useArtworkSelection', () => {
  const mockArt2: AICArtwork = {
    id: 456,
    title: 'Irises',
    image_id: 'img-456',
    artist_display: 'Vincent van Gogh',
    thumbnail: { alt_text: 'Purple irises' },
  };

  let testStore: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    testStore = createTestStore();
  });

  it('should initialize with empty selection', () => {
    const { result } = renderHook(() => useArtworkSelection(), {
      wrapper: wrapper(testStore),
    });
    expect(result.current.selectedEntities).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it('should select an artwork', () => {
    const { result } = renderHook(() => useArtworkSelection(), {
      wrapper: wrapper(testStore),
    });

    act(() => {
      result.current.select(MOCK_ART);
    });

    expect(result.current.selectedEntities).toEqual([MOCK_ART]);
    expect(result.current.count).toBe(1);
  });

  it('should unselect an artwork', () => {
    const { result } = renderHook(() => useArtworkSelection(), {
      wrapper: wrapper(testStore),
    });

    act(() => {
      result.current.select(MOCK_ART);
    });
    act(() => {
      result.current.unselect(MOCK_ART);
    });

    expect(result.current.selectedEntities).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it('should clear all selections', () => {
    const { result } = renderHook(() => useArtworkSelection(), {
      wrapper: wrapper(testStore),
    });

    act(() => {
      result.current.select(MOCK_ART);
      result.current.select(mockArt2);
    });
    expect(result.current.count).toBe(2);

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.selectedEntities).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it('should check if an artwork is selected by id', () => {
    const { result } = renderHook(() => useArtworkSelection(), {
      wrapper: wrapper(testStore),
    });

    expect(result.current.isSelected(MOCK_ART.id)).toBe(false);

    act(() => {
      result.current.select(MOCK_ART);
    });

    expect(result.current.isSelected(MOCK_ART.id)).toBe(true);
    expect(result.current.isSelected(mockArt2.id)).toBe(false);
  });

  it('should toggle selection (select if not selected, unselect if selected)', () => {
    const { result } = renderHook(() => useArtworkSelection(), {
      wrapper: wrapper(testStore),
    });

    act(() => {
      result.current.toggle(MOCK_ART);
    });
    expect(result.current.isSelected(MOCK_ART.id)).toBe(true);

    act(() => {
      result.current.toggle(MOCK_ART);
    });
    expect(result.current.isSelected(MOCK_ART.id)).toBe(false);
  });
});
