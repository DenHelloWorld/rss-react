export const useErrorMessage = (error: unknown): string | null => {
  if (!error) return null;

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return 'An unknown error has occurred';
};
