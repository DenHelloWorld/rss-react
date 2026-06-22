import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePathname } from '../../i18n/navigation';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import ArtworkResultsLayout from './ArtworkResultsLayout.tsx';

vi.mock('../../components/ArtworkResults/ArtworkResults.tsx', () => ({
  default: () => <div>ArtworkResults</div>,
}));

const renderLayout = () =>
  render(
    <Provider store={store}>
      <ArtworkResultsLayout />
    </Provider>
  );

describe(ArtworkResultsLayout.name, () => {
  it('should render ArtworkResults', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    renderLayout();

    expect(screen.getByText('ArtworkResults')).toBeInTheDocument();
  });

  it('should not have main-panel--aside class on root route', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    renderLayout();

    const panel = screen.getByText('ArtworkResults').closest('.main-panel');
    expect(panel).not.toHaveClass('main-panel--aside');
  });

  it('should have main-panel--aside class on details route', () => {
    vi.mocked(usePathname).mockReturnValue('/details/123');

    renderLayout();

    const panel = screen.getByText('ArtworkResults').closest('.main-panel');
    expect(panel).toHaveClass('main-panel--aside');
  });
});
