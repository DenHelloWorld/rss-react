import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from './router/router.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ThemeProvider from './providers/ThemeProvider/ThemeProvider.tsx';
import ModalPortalProvider from './providers/ModalPortalProvider/ModalPortalProvider.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to find the root');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <ModalPortalProvider>
            <RouterProvider router={router} />
          </ModalPortalProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
