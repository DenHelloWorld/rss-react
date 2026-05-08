import { vi } from 'vitest';

export const CONSOLE_ERROR_SPY = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});
