import { vi } from 'vitest';

export const createMockRouter = (push = vi.fn()) => ({
  push,
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  refresh: vi.fn(),
});
