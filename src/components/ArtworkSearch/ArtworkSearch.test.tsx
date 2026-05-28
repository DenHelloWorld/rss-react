import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import ArtworkSearch from './ArtworkSearch';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import type { Mock } from 'vitest';
import type { ReactElement } from 'react';

vi.mock('../../hooks/useLocalStorage/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('../SearchBar/SearchBar', () => ({
  default: ({
    initialValue,
    onSearch,
  }: {
    initialValue: string;
    onSearch: (v: string) => void;
  }) => (
    <div>
      <input
        aria-label="search-input"
        defaultValue={initialValue}
        data-testid="search-input"
      />
      <button
        onClick={() => {
          onSearch('new-value');
        }}
      >
        Search New
      </button>
      <button
        onClick={() => {
          onSearch(initialValue);
        }}
      >
        Search Same
      </button>
      <button
        onClick={() => {
          onSearch(`  ${initialValue}  `);
        }}
      >
        Search Trim
      </button>
    </div>
  ),
}));

const renderWithStore = (ui: ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe(ArtworkSearch.name, () => {
  const setStoredSearchTermMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLocalStorage as Mock).mockReturnValue([
      'initial-val',
      setStoredSearchTermMock,
    ]);
  });

  it('should update storage and URL when a new search is performed (Branch: Changed)', () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkSearch />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Search New'));

    expect(setStoredSearchTermMock).toHaveBeenCalledWith('new-value');
  });

  it('should NOT update if the search term is identical (Branch: Unchanged)', () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/?query=initial-val']}>
        <ArtworkSearch />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Search Same'));

    expect(setStoredSearchTermMock).not.toHaveBeenCalled();
  });

  it('should NOT update if the search term is identical after trim (Branch: Trimmed)', () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/?query=initial-val']}>
        <ArtworkSearch />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Search Trim'));

    expect(setStoredSearchTermMock).not.toHaveBeenCalled();
  });

  it('should use empty string if both URL and storage are empty (Branch: Fallback)', () => {
    (useLocalStorage as Mock).mockReturnValue([null, setStoredSearchTermMock]);

    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkSearch />
      </MemoryRouter>
    );

    const input: HTMLInputElement = screen.getByTestId('search-input');
    expect(input.value).toBe('');
  });
});
