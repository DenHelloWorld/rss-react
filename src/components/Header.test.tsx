import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe(Header.name, () => {
  it('should render with correct class and content', () => {
    const testText = 'testText';

    render(<Header>{testText}</Header>);

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
    expect(header).toHaveTextContent(testText);
  });
});
