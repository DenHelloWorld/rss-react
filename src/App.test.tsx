import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App.tsx';

describe(App.name, () => {
  it('should render header and main content area', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
