import { vi } from 'vitest';

export const CONSOLE_ERROR_SPY = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});

export const CONSOLE_WARN_SPY = vi
  .spyOn(console, 'warn')
  .mockImplementation(() => {});
