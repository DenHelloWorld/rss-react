import { render, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { WithQueryClient } from '../test-utils/query-client-test-utils.tsx';

describe('Router Configuration', () => {
  it('should initialize without crashing', async () => {
    const { unmount } = render(
      <WithQueryClient>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </WithQueryClient>
    );

    await waitFor(() => {
      expect(router).toBeDefined();
    });

    unmount();
  });
});
