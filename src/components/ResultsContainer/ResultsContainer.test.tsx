import { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import ResultsContainer from './ResultsContainer';

vi.mock('../../hooks/useNavigationLoading/useNavigationLoading', () => ({
  useNavigationLoading: () => ({ isNavigating: false }),
}));
import { UI_TEST_TEXT } from '../../test-utils/ui-test-text.const.ts';
import { MOCK_ART, MOCK_PAGINATION } from '../../test-utils/mocks/mock-data.ts';
import type { AICResponse } from '../../store/arts/arts-api.ts';

const mockData: AICResponse = {
  data: [MOCK_ART],
  pagination: MOCK_PAGINATION,
};

describe(ResultsContainer.name, () => {
  const artCollectionContent: RegExp = UI_TEST_TEXT.artCollection;
  const noItemsFoundContent: RegExp = UI_TEST_TEXT.noItemsFound;

  const renderComponent = (
    props: Partial<ComponentProps<typeof ResultsContainer>> = {}
  ) =>
    render(
      <Provider store={store}>
        <ResultsContainer
          data={mockData}
          errorMessage={null}
          searchTerm=""
          {...props}
        />
      </Provider>
    );

  it('renders default title when no search term is provided', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: artCollectionContent })
    ).toBeInTheDocument();
  });

  it('renders search term in the title', () => {
    renderComponent({ searchTerm: 'Monet' });

    expect(
      screen.getByRole('heading', { name: /results for "monet"/i })
    ).toBeInTheDocument();
  });

  it('displays error message when errorMessage is provided', () => {
    const error = 'Failed to fetch data';
    renderComponent({ data: null, errorMessage: error });

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText(noItemsFoundContent)).not.toBeInTheDocument();
  });

  it('displays "no items found" when data is empty and no error', () => {
    const emptyData: AICResponse = { ...mockData, data: [] };
    renderComponent({ data: emptyData });

    const grid = document.querySelector('.cards-grid');

    expect(screen.getByText(noItemsFoundContent)).toBeInTheDocument();
    expect(grid).not.toBeInTheDocument();
  });

  it('renders cards grid when no error and not empty', () => {
    const { container } = renderComponent();

    const grid = container.querySelector('.cards-grid');

    expect(grid).toBeInTheDocument();
  });
});
