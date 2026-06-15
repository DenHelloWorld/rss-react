import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRouter, useParams } from 'next/navigation';
import AICCard from './AICCard';
import type { AICArtwork } from '../../store/arts/arts-api.ts';
import { UI_TEST_TEXT } from '../../test-utils/ui-test-text.const.ts';
import { MOCK_ART } from '../../test-utils/mock-data.ts';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';

describe(AICCard.name, () => {
  const mockArt: AICArtwork = MOCK_ART;
  const noDescContent: string = UI_TEST_TEXT.noDescription;
  const mockGetImageUrl = (id: string) => `https://example.com/${id}.jpg`;
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      replace: vi.fn(),
    } as ReturnType<typeof useRouter>);
    vi.mocked(useParams).mockReturnValue({});
  });

  const renderCard = (art = mockArt) =>
    render(
      <Provider store={store}>
        <AICCard art={art} getImageUrl={mockGetImageUrl} />
      </Provider>
    );

  it('renders art title and description correctly', () => {
    renderCard();
    expect(screen.getByText(mockArt.title)).toBeInTheDocument();
    expect(screen.getByText(mockArt.thumbnail!.alt_text)).toBeInTheDocument();
  });

  it('shows skeleton while image is loading', () => {
    const { container } = renderCard();
    expect(container.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('hides skeleton and shows image after successful load', () => {
    const { container } = renderCard();
    fireEvent.load(screen.getByRole('img'));
    expect(container.querySelector('.skeleton')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveClass('opacity-100');
  });

  it('shows placeholder when image fails to load', () => {
    const { container } = renderCard();
    fireEvent.error(screen.getByRole('img'));
    expect(container.querySelector('.card-placeholder')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders artist display if thumbnail alt_text is missing', () => {
    renderCard({ ...mockArt, thumbnail: undefined });
    expect(screen.getByText(mockArt.artist_display)).toBeInTheDocument();
  });

  it('displays fallback text when both alt_text and artist_display are missing', () => {
    renderCard({ ...mockArt, thumbnail: undefined, artist_display: '' });
    expect(screen.getByText(noDescContent)).toBeInTheDocument();
  });

  it('navigates to details page when clicked', () => {
    renderCard();
    fireEvent.click(screen.getByText(mockArt.title));
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining(`/details/${String(mockArt.id)}`)
    );
  });

  it('scrolls into view when card is active', () => {
    vi.mocked(useParams).mockReturnValue({ id: String(mockArt.id) });
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
    render(
      <Provider store={store}>
        <AICCard art={mockArt} getImageUrl={vi.fn()} />
      </Provider>
    );
    expect(scrollSpy).toHaveBeenCalledWith({ block: 'center' });
  });
});
