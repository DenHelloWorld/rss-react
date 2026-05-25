import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingIndicator from './LoadIndicator';

describe(LoadingIndicator.name, () => {
  it('should render with a spinning animation', () => {
    const { container } = render(<LoadingIndicator />);

    const spinner = container.querySelector('.animate-spin');

    expect(spinner).toBeInTheDocument();
  });

  it('should have the correct structure', () => {
    const { container } = render(<LoadingIndicator />);

    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv.className).toContain('relative');
    expect(outerDiv.children.length).toBe(2);
  });
});
