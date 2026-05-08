import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { AICApiService, type AICArtwork } from './services/AICApiService';
import {
  localStorageService,
  STORAGE_KEYS,
} from './services/local-storage.service.ts';
import { MOCK_ART } from './test-utils/mock-data.ts';
import type { ReactNode } from 'react';

vi.mock('./components/SearchBar.tsx', () => ({
  default: ({
    onSearch,
    initialValue,
  }: {
    onSearch: (v: string) => void;
    initialValue: string;
  }) => (
    <div>
      <input
        aria-label="search-input"
        defaultValue={initialValue}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSearch(initialValue);
        }}
      >
        Search
      </button>
    </div>
  ),
}));

vi.mock('./components/AICCard.tsx', () => ({
  default: ({ art }: { art: { title: string } }) => <div>{art.title}</div>,
}));

vi.mock('./components/ResultsContainer.tsx', () => ({
  ResultsContainer: ({
    children,
    errorMessage,
    isLoading,
  }: {
    children: ReactNode;
    errorMessage: string | null;
    isLoading: boolean;
  }) => (
    <div>
      {isLoading && <span>Loading...</span>}
      {errorMessage && <span>{errorMessage}</span>}
      {children}
    </div>
  ),
}));

vi.mock('./components/ErrorTrigger.tsx', () => ({ default: () => <div /> }));

describe(App.name, () => {
  const searchSpy = vi.spyOn(AICApiService, 'search');
  const getItemSpy = vi.spyOn(localStorageService, 'getItem');
  const setItemSpy = vi.spyOn(localStorageService, 'setItem');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle null search term from storage on mount', async () => {
    getItemSpy.mockReturnValue(null);
    searchSpy.mockResolvedValue({ data: [] });

    render(<App />);

    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalledWith('');
    });
  });

  it('should hide loader after successful search', async () => {
    const mockArt: AICArtwork = MOCK_ART;

    searchSpy.mockResolvedValue({ data: [mockArt] });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(mockArt.title)).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should handle non-Error objects in catch block', async () => {
    searchSpy.mockRejectedValue('String Error');

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('An unknown error occurred')).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should handle standard Error objects', async () => {
    searchSpy.mockRejectedValue(new Error('API Down'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('API Down')).toBeInTheDocument();
    });
  });

  it('should not trigger search if term is identical after trim', () => {
    getItemSpy.mockReturnValue('Monet');
    searchSpy.mockResolvedValue({ data: [] });

    render(<App />);

    const input = screen.getByLabelText('search-input');

    searchSpy.mockClear();
    setItemSpy.mockClear();

    fireEvent.change(input, { target: { value: '  Monet  ' } });
    fireEvent.click(screen.getByText('Search'));

    expect(searchSpy).not.toHaveBeenCalled();
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('should update storage and search when term changes', async () => {
    searchSpy.mockResolvedValue({ data: [] });

    render(<App />);

    const input = screen.getByLabelText('search-input');

    fireEvent.change(input, { target: { value: 'Dali' } });
    fireEvent.click(screen.getByText('Search'));

    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM, 'Dali');
    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalledWith('Dali');
    });
  });
});
