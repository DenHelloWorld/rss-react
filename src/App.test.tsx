import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { WithQueryClient } from './test-utils/query-client-test-utils.tsx';

describe(App.name, () => {
  it('should render header and main content area', () => {
    render(
      <WithQueryClient>
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      </WithQueryClient>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
