import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ResultsContainer } from './ResultsContainer';

describe(ResultsContainer.name, () => {
  const defaultProps = {
    searchTerm: '',
    isLoading: false,
    errorMessage: null,
    isEmpty: false,
  };

  it('renders default title when no search term is provided', () => {
    render(
      <ResultsContainer {...defaultProps}>
        <div>Children Content</div>
      </ResultsContainer>
    );

    expect(
      screen.getByRole('heading', { name: /art collection/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  it('renders search term in the title', () => {
    render(
      <ResultsContainer {...defaultProps} searchTerm="Monet">
        <div />
      </ResultsContainer>
    );

    expect(
      screen.getByRole('heading', { name: /results for "monet"/i })
    ).toBeInTheDocument();
  });

  it('shows loading indicator when isLoading is true', () => {
    const { container } = render(
      <ResultsContainer {...defaultProps} isLoading={true}>
        <div />
      </ResultsContainer>
    );

    const spinner = container.querySelector('.animate-spin');

    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText('No items found.')).not.toBeInTheDocument();
  });

  it('displays error message when errorMessage is provided', () => {
    const error = 'Failed to fetch data';
    render(
      <ResultsContainer {...defaultProps} errorMessage={error}>
        <div />
      </ResultsContainer>
    );

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText('No items found.')).not.toBeInTheDocument();
  });

  it('displays "no items found" when isEmpty is true and no error', () => {
    render(
      <ResultsContainer {...defaultProps} isEmpty={true}>
        <div />
      </ResultsContainer>
    );

    const grid = document.querySelector('.cards-grid');

    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
    expect(grid).not.toBeInTheDocument();
  });

  it('renders cards grid when not loading, no error, and not empty', () => {
    const { container } = render(
      <ResultsContainer {...defaultProps}>
        <div data-testid="child-card">Card</div>
      </ResultsContainer>
    );

    const grid = container.querySelector('.cards-grid');

    expect(grid).toBeInTheDocument();
    expect(screen.getByTestId('child-card')).toBeInTheDocument();
  });
});
