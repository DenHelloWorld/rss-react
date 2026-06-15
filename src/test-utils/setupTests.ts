import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/'),
  useParams: vi.fn(() => ({})),
}));
import { cleanup } from '@testing-library/react';
import { CONSOLE_ERROR_SPY, CONSOLE_WARN_SPY } from './console-spies.const.ts';
import { AICServerMock } from './server.ts';
import { localStorageMock, StorageMock } from './storage-mock.ts';

beforeAll(() => AICServerMock.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  CONSOLE_ERROR_SPY.mockClear();
  CONSOLE_WARN_SPY.mockClear();
  AICServerMock.resetHandlers();
});

afterAll(() => {
  AICServerMock.close();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.IntersectionObserver = vi.fn().mockImplementation(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: vi.fn(() => []),
  };
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});

global.Storage = StorageMock;
window.Storage = StorageMock;

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: vi.fn(),
});
