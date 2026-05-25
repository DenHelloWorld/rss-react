import { describe, it, expect } from 'vitest';
import { useErrorMessage } from './useErrorMessage.ts';

describe('useErrorMessage', () => {
  it('should return null when error is null', () => {
    expect(useErrorMessage(null)).toBeNull();
  });

  it('should return null when error is undefined', () => {
    expect(useErrorMessage(undefined)).toBeNull();
  });

  it('should return Error message for Error instances', () => {
    const error = new Error('Something went wrong');
    expect(useErrorMessage(error)).toBe('Something went wrong');
  });

  it('should extract message from objects with message property', () => {
    const error = { message: 'Custom error message' };
    expect(useErrorMessage(error)).toBe('Custom error message');
  });

  it('should return default message for unknown error types', () => {
    expect(useErrorMessage(42)).toBe('An unknown error has occurred');
  });

  it('should return default message for string errors', () => {
    expect(useErrorMessage('oops')).toBe('An unknown error has occurred');
  });
});
