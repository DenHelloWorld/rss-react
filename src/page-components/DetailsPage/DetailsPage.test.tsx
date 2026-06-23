import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useParams } from 'next/navigation';
import { useRouter } from '../../i18n/navigation';
import { createMockRouter } from '../../test-utils/mocks/router';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { artsApi, API_URL } from '../../store/arts/arts-api.ts';
import type { AICArtworkDetails } from '../../store/arts/arts-api.ts';
import { API_TAGS } from '../../consts/api-tags.const.ts';
import { HTTP_STATUS } from '../../consts/http-status.const.ts';
import { AICServerMock } from '../../test-utils/mocks/server';
import { http, HttpResponse } from 'msw';
import DetailsPage from './DetailsPage.tsx';

vi.mock('../../components/LoadIndicator/LoadIndicator.tsx', () => ({
  default: () => <div>Loading...</div>,
}));

const mockPush = vi.fn();

const MOCK_DETAILS: AICArtworkDetails = {
  id: 123,
  title: 'Starry Night',
  artist_display: 'Vincent van Gogh',
  image_id: 'sample-image-id',
  date_display: '1889',
  medium_display: 'Oil on canvas',
  place_of_origin: 'France',
  dimensions: '73.7 cm × 92.1 cm',
};

const renderWithId = (id = '123') => {
  vi.mocked(useParams).mockReturnValue({ id });
  return render(
    <Provider store={store}>
      <DetailsPage />
    </Provider>
  );
};

describe(DetailsPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    AICServerMock.resetHandlers();
    vi.mocked(useRouter).mockReturnValue(createMockRouter(mockPush));
  });

  afterEach(() => {
    store.dispatch(artsApi.util.resetApiState());
  });

  it('should navigate to root when close button is clicked', async () => {
    renderWithId();

    await waitFor(() => {
      expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/'));
  });

  it('should call getById with the id from route params', async () => {
    renderWithId('456');

    await waitFor(() => {
      expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });
  });

  it('should handle API error gracefully', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/:id`, () => {
        return new HttpResponse(null, {
          status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        });
      })
    );

    renderWithId('123');

    await waitFor(() => {
      expect(
        screen.getByText('An unknown error has occurred')
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Starry Night')).not.toBeInTheDocument();
  });

  it('should render error section for non-Error rejection', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/:id`, () => HttpResponse.error())
    );

    renderWithId('123');

    await waitFor(() => {
      expect(screen.queryByText('Starry Night')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should not call API if id is missing', () => {
    vi.mocked(useParams).mockReturnValue({});
    render(
      <Provider store={store}>
        <DetailsPage />
      </Provider>
    );
  });

  it('should render all details correctly when data is fully provided', async () => {
    renderWithId();

    await waitFor(() => {
      expect(
        screen.getByText(MOCK_DETAILS.artist_display satisfies string)
      ).toBeInTheDocument();
      expect(
        screen.getByText(String(MOCK_DETAILS.place_of_origin))
      ).toBeInTheDocument();
      expect(
        screen.getByText(String(MOCK_DETAILS.date_display))
      ).toBeInTheDocument();
      expect(
        screen.getByText(String(MOCK_DETAILS.dimensions))
      ).toBeInTheDocument();
      expect(
        screen.getByText(MOCK_DETAILS.medium_display!)
      ).toBeInTheDocument();
    });
  });

  it('should serve cached data when re-visiting the same detail', async () => {
    await store.dispatch(
      artsApi.util.upsertQueryData('getArtById', '123', { data: MOCK_DETAILS })
    );

    renderWithId('123');

    expect(screen.getByText('Starry Night')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should refetch detail data after cache invalidation', async () => {
    renderWithId('123');

    await waitFor(() => {
      expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });

    const queryKey = `getArtById("123")`;
    const requestIdBefore =
      store.getState().artsApi.queries[queryKey]?.requestId;

    store.dispatch(
      artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id: 123 }])
    );

    await waitFor(() => {
      const requestIdAfter =
        store.getState().artsApi.queries[queryKey]?.requestId;
      expect(requestIdAfter).not.toBe(requestIdBefore);
    });
  });

  it('should show fallback values for origin and dimensions', async () => {
    await store.dispatch(
      artsApi.util.upsertQueryData('getArtById', '123', {
        data: {
          ...MOCK_DETAILS,
          place_of_origin: undefined,
          dimensions: undefined,
        },
      })
    );

    renderWithId();

    await waitFor(() => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
      expect(screen.getByText('Dimensions not available')).toBeInTheDocument();
    });
  });
});
