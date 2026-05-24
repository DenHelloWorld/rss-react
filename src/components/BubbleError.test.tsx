import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useRouteError } from 'react-router';
import BubbleError from './BubbleError';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('BubbleError', () => {
  it('should throw the error received from useRouteError', () => {
    const mockError = new Error('Test Route Error');
    vi.mocked(useRouteError).mockReturnValue(mockError);

    expect(() => {
      render(
        <MemoryRouter>
          <BubbleError />
        </MemoryRouter>
      );
    }).toThrow('Test Route Error');
  });
});
