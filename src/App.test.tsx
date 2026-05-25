import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App.tsx';
import { WithQueryClient } from './test-utils/query-client-test-utils.tsx';

describe(App.name, () => {
  it('should render header and main content area', () => {
    render(
      <WithQueryClient>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </WithQueryClient>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
