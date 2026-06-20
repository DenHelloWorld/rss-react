import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import artsReducer, { toggleSelect } from '../../store/arts/arts-slice.ts';
import Flyout from './Flyout';
import { MOCK_ART } from '../../test-utils/mocks/mock-data.ts';
import * as useArtworksDownloadModule from '../../hooks/useArtworksDownload/useArtworksDownload.ts';

const createTestStore = () =>
  configureStore({
    reducer: { arts: artsReducer },
  });

describe(Flyout.name, () => {
  let testStore: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    testStore = createTestStore();
  });

  const renderFlyout = () =>
    render(
      <Provider store={testStore}>
        <Flyout />
      </Provider>
    );

  it('should show "0 item selected" when no items selected', () => {
    renderFlyout();
    expect(screen.getByText('0 item selected')).toBeInTheDocument();
  });

  it('should display the count of selected items', () => {
    testStore.dispatch(toggleSelect(MOCK_ART));
    renderFlyout();

    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  it('should clear all selections when "Unselect all" is clicked', () => {
    testStore.dispatch(toggleSelect(MOCK_ART));
    renderFlyout();

    fireEvent.click(screen.getByText('Unselect all'));
    expect(screen.getByText('0 item selected')).toBeInTheDocument();
  });

  it('should render download button', () => {
    renderFlyout();
    expect(screen.getByText('Download CSV')).toBeInTheDocument();
  });

  it('should call downloadAsCsv when download button is clicked', () => {
    const downloadSpy = vi.fn();
    vi.spyOn(useArtworksDownloadModule, 'useArtworksDownload').mockReturnValue({
      downloadAsCsv: downloadSpy,
    });

    testStore.dispatch(toggleSelect(MOCK_ART));
    renderFlyout();

    fireEvent.click(screen.getByText('Download CSV'));
    expect(downloadSpy).toHaveBeenCalledWith([MOCK_ART]);
  });
});
