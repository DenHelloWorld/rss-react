import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LazyImage from './LazyImage';

describe(LazyImage.name, () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
  };

  it('should render image with correct src and alt', () => {
    render(<LazyImage {...defaultProps} />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', defaultProps.src);
    expect(img).toHaveAttribute('alt', defaultProps.alt);
  });

  it('should show skeleton while loading', () => {
    const { container } = render(<LazyImage {...defaultProps} />);

    const skeleton = container.querySelector('.skeleton');

    expect(skeleton).toBeInTheDocument();
  });

  it('should hide skeleton and show image on load', () => {
    const { container } = render(<LazyImage {...defaultProps} />);
    const img = screen.getByRole('img');

    fireEvent.load(img);

    expect(container.querySelector('.skeleton')).not.toBeInTheDocument();
    expect(img).toHaveClass('opacity-100');
  });

  it('should show placeholder on image error', () => {
    const { container } = render(<LazyImage {...defaultProps} />);
    const img = screen.getByRole('img');

    fireEvent.error(img);

    expect(container.querySelector('.card-placeholder')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.querySelector('.skeleton')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<LazyImage {...defaultProps} className="custom-class" />);

    const img = screen.getByRole('img');

    expect(img.className).toContain('custom-class');
  });
});
