import { createContext } from 'react';

export type NavigationLoadingContextType = {
  isNavigating: boolean;
  setIsNavigating: (v: boolean) => void;
};

export const NavigationLoadingContext =
  createContext<NavigationLoadingContextType | null>(null);
