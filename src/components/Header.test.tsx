import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import { MemoryRouter } from 'react-router';

describe(Header.name, () => {
  it('should render with correct class and content', () => {
    const testText = 'testText';

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header>{testText}</Header>
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
    expect(header).toHaveTextContent(testText);
  });
});
