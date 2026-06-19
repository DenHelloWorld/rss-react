import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AboutPage from './AboutPage.tsx';

vi.mock('../../components/LazyImage/LazyImage.tsx', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe(AboutPage.name, () => {
  beforeEach(async () => {
    render(await AboutPage());
  });

  it('should render the page heading', () => {
    expect(
      screen.getByRole('heading', { name: /about the project/i })
    ).toBeInTheDocument();
  });

  it('should render the author heading', () => {
    expect(
      screen.getByRole('heading', { name: /author/i })
    ).toBeInTheDocument();
  });

  it('should render a link to the AIC API docs', () => {
    const link = screen.getByRole('link', { name: /public api/i });
    expect(link).toHaveAttribute('href', 'https://api.artic.edu/docs/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render a link to the author GitHub', () => {
    const link = screen.getByRole('link', { name: /denhelloworld/i });
    expect(link).toHaveAttribute('href', 'https://github.com/denhelloworld');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render a link to the RS School React course', () => {
    const link = screen.getByRole('link', { name: /rs school react course/i });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render the author avatar image', () => {
    const img = screen.getByAltText('GitHub Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://github.com/denhelloworld.png');
  });
});
