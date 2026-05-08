import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AICCard from './AICCard';
import type { AICArtwork } from '../services/AICApiService.ts';

describe(AICCard.name, () => {
  const mockArt: AICArtwork = {
    id: 123,
    title: 'Starry Night',
    image_id: 'sample-id',
    artist_display: 'Vincent van Gogh',
    thumbnail: { alt_text: 'A beautiful night sky' },
  };

  const mockGetImageUrl = (id: string) => `https://example.com/${id}.jpg`;

  it('renders art title and description correctly', () => {
    render(<AICCard art={mockArt} getImageUrl={mockGetImageUrl} />);

    expect(screen.getByText('Starry Night')).toBeInTheDocument();
    expect(screen.getByText('A beautiful night sky')).toBeInTheDocument();
  });

  it('shows skeleton while image is loading', () => {
    const { container } = render(
      <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
    );

    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('hides skeleton and shows image after successful load', () => {
    const { container } = render(
      <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
    );

    const img = screen.getByRole('img');

    fireEvent.load(img);

    const skeleton = container.querySelector('.skeleton');

    expect(skeleton).not.toBeInTheDocument();
    expect(img).toHaveClass('opacity-100');
  });

  it('shows placeholder when image fails to load', () => {
    const { container } = render(
      <AICCard art={mockArt} getImageUrl={mockGetImageUrl} />
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

    render(<AICCard art={artWithoutAlt} getImageUrl={mockGetImageUrl} />);

    expect(screen.getByText('Vincent van Gogh')).toBeInTheDocument();
  });

  it('displays fallback text when both alt_text and artist_display are missing', () => {
    const emptyArt = {
      ...mockArt,
      thumbnail: undefined,
      artist_display: '',
    };

    render(<AICCard art={emptyArt} getImageUrl={mockGetImageUrl} />);

    expect(screen.getByText('No description available')).toBeInTheDocument();
  });
});
