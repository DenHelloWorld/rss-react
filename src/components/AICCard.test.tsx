import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AICCard from './AICCard';
import type { AICArtwork } from '../services/aic-api-service.ts';
import { UI_TEST_TEXT } from '../test-utils/ui-test-text.const.ts';
import { MOCK_ART } from '../test-utils/mock-data.ts';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

describe(AICCard.name, () => {
  const mockArt: AICArtwork = MOCK_ART;
  const noDescContent: string = UI_TEST_TEXT.noDescription;
  const mockGetImageUrl = (id: string) => `https://example.com/${id}.jpg`;

  it('renders art title and description correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockArt.title)).toBeInTheDocument();
    expect(screen.getByText(mockArt.thumbnail!.alt_text)).toBeInTheDocument();
  });

  it('shows skeleton while image is loading', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
        </MemoryRouter>
      </Provider>
    );
    const skeleton = container.querySelector('.skeleton');

    expect(skeleton).toBeInTheDocument();
  });

  it('hides skeleton and shows image after successful load', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
        </MemoryRouter>
      </Provider>
    );
    const img = screen.getByRole('img');

    fireEvent.load(img);

    const skeleton = container.querySelector('.skeleton');

    expect(skeleton).not.toBeInTheDocument();
    expect(img).toHaveClass('opacity-100');
  });

  it('shows placeholder when image fails to load', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
        </MemoryRouter>
      </Provider>
    );
    const img = screen.getByRole('img');

    fireEvent.error(img);

    const placeholder = container.querySelector('.card-placeholder');

    expect(placeholder).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders artist display if thumbnail alt_text is missing', () => {
    const artWithoutAlt = {
      ...mockArt,
      thumbnail: undefined,
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AICCard art={artWithoutAlt} getImageUrl={mockGetImageUrl} />{' '}
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(artWithoutAlt.artist_display)).toBeInTheDocument();
  });

  it('displays fallback text when both alt_text and artist_display are missing', () => {
    const emptyArt = {
      ...mockArt,
      thumbnail: undefined,
      artist_display: '',
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AICCard art={emptyArt} getImageUrl={mockGetImageUrl} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(noDescContent)).toBeInTheDocument();
  });

  it('navigates to details page when clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={<AICCard art={mockArt} getImageUrl={mockGetImageUrl} />}
            />
            <Route path="/details/:id" element={<div>Details Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(mockArt.title));
    expect(screen.getByText('Details Page')).toBeInTheDocument();
  });

  it('scrolls into view when card is active', () => {
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/details/${String(mockArt.id)}`]}>
          <Routes>
            <Route
              path="/details/:id"
              element={<AICCard art={mockArt} getImageUrl={vi.fn()} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(scrollSpy).toHaveBeenCalledWith({ block: 'center' });
  });
});
