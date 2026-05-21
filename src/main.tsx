import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from './router/router.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to find the root');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
