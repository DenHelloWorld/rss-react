import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import ArtworkResults from './ArtworkResults';
import { AICApiService } from '../../services/AICApiService/aic-api-service.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { MOCK_ART, MOCK_PAGINATION } from '../../test-utils/mock-data';
import type { Mock } from 'vitest';
import { WithQueryClient } from '../../test-utils/query-client-test-utils.tsx';
import type { ReactElement } from 'react';

vi.mock('../../services/AICApiService', () => ({
  AICApiService: {
    search: vi.fn(),
    getImageUrl: vi.fn((id: string) => `url-${id}`),
  },
}));

vi.mock('../../hooks/useLocalStorage/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('../AICCard/AICCard', () => ({
  default: ({ art }: { art: { title: string } }) => <div>{art.title}</div>,
}));

const renderWithQueryClient = (ui: ReactElement) =>
  render(<WithQueryClient>{ui}</WithQueryClient>);

describe(ArtworkResults.name, () => {
  const mockedSearch = vi.spyOn(AICApiService, 'search');

  beforeEach(() => {
    vi.clearAllMocks();
    (useLocalStorage as Mock).mockReturnValue(['default-term']);
  });

  it('should call performSearch on mount with params from URL', async () => {
    mockedSearch.mockResolvedValue({
      data: [MOCK_ART],
      pagination: MOCK_PAGINATION,
    });

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?query=monet&page=2']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedSearch).toHaveBeenCalledWith('monet', { page: '2' });
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
  });

  it('should handle pagination change', async () => {
    mockedSearch.mockResolvedValue({
      data: [MOCK_ART],
      pagination: MOCK_PAGINATION,
    });

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/?query=monet&page=1']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });

    mockedSearch.mockClear();
    mockedSearch.mockResolvedValue({
      data: [MOCK_ART],
      pagination: { ...MOCK_PAGINATION, current_page: 2 },
    });

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find((btn) =>
      btn.innerHTML.includes('arrow-right')
    );

    if (!nextButton) throw new Error('Next button not found');

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockedSearch).toHaveBeenCalledWith('monet', { page: '2' });
    });
  });

  it('should display error message when API fails', async () => {
    const errorMessage = 'Network Error';
    mockedSearch.mockRejectedValue(new Error(errorMessage));

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show "An unknown error occurred" for non-Error exceptions', async () => {
    mockedSearch.mockRejectedValue('String Error');

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('An unknown error has occurred')
      ).toBeInTheDocument();
    });
  });

  it('should show loading state', async () => {
    mockedSearch.mockReturnValue(new Promise(() => {}));

    const { container } = renderWithQueryClient(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      const loader = container.querySelector('.animate-spin');
      expect(loader).toBeInTheDocument();
    });
  });

  it('should fallback to empty string when both URL and localStorage are empty', async () => {
    mockedSearch.mockResolvedValue({
      data: [],
      pagination: MOCK_PAGINATION,
    });

    (useLocalStorage as Mock).mockReturnValue([null as unknown as string]);

    renderWithQueryClient(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedSearch).toHaveBeenCalledWith('', { page: '' });
    });
  });
});
