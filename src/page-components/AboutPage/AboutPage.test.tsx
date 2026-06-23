import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import AboutPage from './AboutPage.tsx';
import { DEFAULT_LOCALE } from '../../consts/locales.const';
import { URLs } from '../../consts/urls.const.ts';

describe(AboutPage.name, () => {
  beforeEach(async () => {
    render(await AboutPage({ locale: DEFAULT_LOCALE }));
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

    expect(link).toHaveAttribute('href', URLs.articApiDocs);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render a link to the author GitHub', () => {
    const link = screen.getByRole('link', { name: /denhelloworld/i });

    expect(link).toHaveAttribute('href', URLs.authorGithub);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render a link to the RS School React course', () => {
    const link = screen.getByRole('link', { name: /rs school react course/i });

    expect(link).toHaveAttribute('href', URLs.rssReactCourse);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render the author avatar image', () => {
    const img = screen.getByAltText('GitHub Avatar');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', URLs.authorGithubAvatar);
  });
});
