'use client';

import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../providers/ThemeProvider/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const Providers = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: string;
}) => (
  <ErrorBoundary>
    <ThemeProvider initialTheme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default Providers;
