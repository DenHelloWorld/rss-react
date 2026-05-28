import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { artsApi, API_URL } from '../../store/arts/arts-api.ts';
import type { AICArtworkDetails } from '../../store/arts/arts-api.ts';
import { AICServerMock } from '../../test-utils/server';
import { http, HttpResponse } from 'msw';
import DetailsPage from './DetailsPage.tsx';

vi.mock('../components/LoadIndicator/LoadIndicator.tsx', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../components/LazyImage/LazyImage.tsx', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

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

const renderWithRouter = (id = '123') =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/details/${id}`]}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

describe(DetailsPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    AICServerMock.resetHandlers();
  });

  afterEach(() => {
    store.dispatch(artsApi.util.resetApiState());
  });

  it('should navigate to root when close button is clicked', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/:id`, () => {
        return HttpResponse.json({ data: MOCK_DETAILS });
      })
    );

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should call getById with the id from route params', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/456`, () => {
        return HttpResponse.json({ data: MOCK_DETAILS });
      })
    );

    renderWithRouter('456');

    await waitFor(() => {
      expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });
  });

  it('should handle API error gracefully', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithRouter('123');

    await waitFor(() => {
      expect(
        screen.getByText('An unknown error has occurred')
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Starry Night')).not.toBeInTheDocument();
  });

  it('should render error section for non-Error rejection', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/:id`, () => {
        return HttpResponse.error();
      })
    );

    renderWithRouter('123');

    await waitFor(() => {
      expect(screen.queryByText('Starry Night')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should not call API if id is missing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/']}>
          <Routes>
            <Route path="/details/:id?" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render all details correctly when data is fully provided', async () => {
    AICServerMock.use(
      http.get(`${API_URL.baseURL}/:id`, () => {
        return HttpResponse.json({ data: MOCK_DETAILS });
      })
    );

    renderWithRouter();

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

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
      expect(screen.getByText('Dimensions not available')).toBeInTheDocument();
    });
  });
});
