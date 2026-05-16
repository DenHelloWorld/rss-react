import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from './router.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to find the root');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
