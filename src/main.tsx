import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from './router/router.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ThemeProvider from './providers/ThemeProvider/ThemeProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to find the root');
}

const queryClient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
