import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import artsReducer from '../../store/arts/arts-slice.ts';
import Flyout from './Flyout';
import { MOCK_ART } from '../../test-utils/mock-data.ts';

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

  it('should show "Selected: 0" when no items selected', () => {
    renderFlyout();
    expect(screen.getByText('Selected: 0')).toBeInTheDocument();
  });

  it('should display the count of selected items', () => {
    testStore.dispatch({ type: 'Arts/selectOne', payload: MOCK_ART });
    renderFlyout();

    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
  });

  it('should clear all selections when "Unselect all" is clicked', () => {
    testStore.dispatch({ type: 'Arts/selectOne', payload: MOCK_ART });
    renderFlyout();

    fireEvent.click(screen.getByText('Unselect all'));
    expect(screen.getByText('Selected: 0')).toBeInTheDocument();
  });

  it('should render download button', () => {
    renderFlyout();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should call downloadAsCsv when download button is clicked', () => {
    testStore.dispatch({ type: 'Arts/selectOne', payload: MOCK_ART });
    renderFlyout();

    fireEvent.click(screen.getByText('Download'));
    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
  });
});
