import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './error.ts';

describe('getErrorMessage', () => {
  it('should return null when error is null', () => {
    expect(getErrorMessage(null)).toBeNull();
  });

  it('should return null when error is undefined', () => {
    expect(getErrorMessage(undefined)).toBeNull();
  });

  it('should return Error message for Error instances', () => {
    const error = new Error('Something went wrong');
    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  it('should return default message for unknown error types', () => {
    expect(getErrorMessage(42)).toBe('An unknown error has occurred');
  });

  it('should return default message for string errors', () => {
    expect(getErrorMessage('oops')).toBe('An unknown error has occurred');
  });
});
