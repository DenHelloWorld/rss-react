'use client';

import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../providers/ThemeProvider/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

type ProvidersProps = {
  children: ReactNode;
  resetLabel: string;
};

const Providers = ({ children, resetLabel }: ProvidersProps) => (
  <ErrorBoundary resetLabel={resetLabel}>
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default Providers;
