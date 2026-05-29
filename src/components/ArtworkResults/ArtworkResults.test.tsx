import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { artsApi, API_URL } from '../../store/arts/arts-api.ts';
import type { AICResponse } from '../../store/arts/arts-api.ts';
import { API_TAGS } from '../../consts/api-tags.const.ts';
import { HTTP_STATUS } from '../../consts/http-status.const.ts';
import ArtworkResults from './ArtworkResults';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { MOCK_ART, MOCK_PAGINATION } from '../../test-utils/mock-data';
import { AICServerMock } from '../../test-utils/server';
import { http, HttpResponse } from 'msw';
import type { Mock } from 'vitest';
import type { ReactElement } from 'react';

vi.mock('../../hooks/useLocalStorage/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('../AICCard/AICCard', () => ({
  default: ({ art }: { art: { title: string } }) => <div>{art.title}</div>,
}));

const renderWithStore = (ui: ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe(ArtworkResults.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    AICServerMock.resetHandlers();
    (useLocalStorage as Mock).mockReturnValue(['default-term']);
  });

  afterEach(() => {
    store.dispatch(artsApi.util.resetApiState());
  });

  it('should call performSearch on mount with params from URL', async () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/?query=monet&page=2']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
  });

  it('should handle pagination change', async () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/?query=monet&page=1']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find((btn) =>
      btn.innerHTML.includes('arrow-right')
    );

    if (!nextButton) throw new Error('Next button not found');

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
  });

  it('should display error message when API fails', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/*`, () => {
        return HttpResponse.json(
          { error: 'Network Error' },
          { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        );
      })
    );

    renderWithStore(
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

  it('should show "An unknown error occurred" for non-Error exceptions', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/*`, () => {
        return HttpResponse.error();
      })
    );

    renderWithStore(
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
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/*`, () => {
        return new Promise(() => {});
      })
    );

    const { container } = renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      const loader = container.querySelector('.animate-spin');
      expect(loader).toBeInTheDocument();
    });
  });

  it('should cache list data between page navigations', async () => {
    const requestTracker = { count: 0 };

    AICServerMock.use(
      http.get(API_URL.baseURL, () => {
        requestTracker.count++;
        return HttpResponse.json({
          data: [MOCK_ART],
          pagination: MOCK_PAGINATION,
        } satisfies AICResponse);
      }),
      http.get(`${API_URL.baseURL}/:path*`, () => {
        requestTracker.count++;
        return HttpResponse.json({
          data: [MOCK_ART],
          pagination: MOCK_PAGINATION,
        } satisfies AICResponse);
      })
    );

    renderWithStore(
      <MemoryRouter initialEntries={['/?query=monet&page=1']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
    expect(requestTracker.count).toBe(1);

    const nextButton = screen
      .getAllByRole('button')
      .find((btn) => btn.innerHTML.includes('arrow-right'))!;
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
    expect(requestTracker.count).toBe(2);

    const prevButton = screen
      .getAllByRole('button')
      .find((btn) => btn.innerHTML.includes('arrow-left'))!;
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
    expect(requestTracker.count).toBe(2);
  });

  it('should refetch list data after cache invalidation', async () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/?query=monet&page=1']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });

    const queryKey = 'searchArts({"limit":9,"page":1,"query":"monet"})';

    const stateBefore = store.getState().artsApi.queries[queryKey];
    expect(stateBefore).toBeDefined();

    store.dispatch(
      artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id: API_TAGS.LIST }])
    );

    await waitFor(() => {
      const stateAfter = store.getState().artsApi.queries[queryKey];
      expect(stateAfter?.status).toBe('pending');
    });

    await waitFor(() => {
      const stateAfter = store.getState().artsApi.queries[queryKey];
      expect(stateAfter?.status).toBe('fulfilled');
    });
  });

  it('should fallback to empty string when both URL and localStorage are empty', async () => {
    (useLocalStorage as Mock).mockReturnValue([null as unknown as string]);

    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <ArtworkResults />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(MOCK_ART.title)).toBeInTheDocument();
    });
  });
});
