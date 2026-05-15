import { render, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { describe, it, expect } from 'vitest';

describe('Router Configuration', () => {
  it('should initialize without crashing', async () => {
    const { unmount } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router).toBeDefined();
    });

    unmount();
  });
});
