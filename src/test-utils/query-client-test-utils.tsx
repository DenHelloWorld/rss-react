import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

export const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface WithQueryClientOptions {
  children: ReactNode;
  queryClient?: QueryClient;
}

export const WithQueryClient = ({
  children,
  queryClient = createTestQueryClient(),
}: WithQueryClientOptions) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
