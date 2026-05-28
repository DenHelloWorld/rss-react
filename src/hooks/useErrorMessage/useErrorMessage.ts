export const useErrorMessage = (error: unknown): string | null => {
  if (!error) return null;

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error has occurred';
};
