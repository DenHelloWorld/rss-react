import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import DetailsPage from './DetailsPage.tsx';
import {
  AICApiService,
  type AICArtworkDetails,
} from '../../services/AICApiService/aic-api-service.ts';

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

const getByIdSpy = vi.spyOn(AICApiService, 'getById');

const renderWithRouter = (id = '123') =>
  render(
    <MemoryRouter initialEntries={[`/details/${id}`]}>
      <Routes>
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe(DetailsPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should navigate to root when close button is clicked', async () => {
    getByIdSpy.mockResolvedValue({ data: MOCK_DETAILS });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should call getById with the id from route params', async () => {
    getByIdSpy.mockResolvedValue({ data: MOCK_DETAILS });

    renderWithRouter('456');

    await waitFor(() => {
      expect(getByIdSpy).toHaveBeenCalledWith('456');
    });
  });

  it('should handle API error gracefully', async () => {
    getByIdSpy.mockRejectedValue(new Error('Fetch failed'));

    renderWithRouter('123');

    await waitFor(() => {
      expect(screen.getByText('Fetch failed')).toBeInTheDocument();
    });

    expect(screen.queryByText('Starry Night')).not.toBeInTheDocument();
  });

  it('should render error section for non-Error rejection', async () => {
    getByIdSpy.mockRejectedValue('string error');

    renderWithRouter('123');

    await waitFor(() => {
      expect(screen.queryByText('Starry Night')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should not call API if id is missing', () => {
    render(
      <MemoryRouter initialEntries={['/details/']}>
        <Routes>
          <Route path="/details/:id?" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByIdSpy).not.toHaveBeenCalled();
  });
  it('should render all details correctly when data is fully provided', async () => {
    getByIdSpy.mockResolvedValue({ data: MOCK_DETAILS });

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
    getByIdSpy.mockResolvedValue({
      data: {
        ...MOCK_DETAILS,
        place_of_origin: null,
        dimensions: null,
      } as unknown as AICArtworkDetails,
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
      expect(screen.getByText('Dimensions not available')).toBeInTheDocument();
    });
  });
});
