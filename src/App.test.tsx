import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

describe(App.name, () => {
  it('should render header and main content area', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
