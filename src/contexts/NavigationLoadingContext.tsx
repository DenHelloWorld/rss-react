'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type NavigationLoadingContextType = {
  isNavigating: boolean;
  setIsNavigating: (v: boolean) => void;
};

const NavigationLoadingContext = createContext<NavigationLoadingContextType | null>(null);

export const NavigationLoadingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  return (
    <NavigationLoadingContext.Provider value={{ isNavigating, setIsNavigating }}>
      {children}
    </NavigationLoadingContext.Provider>
  );
};

export const useNavigationLoading = () => {
  const ctx = useContext(NavigationLoadingContext);
  if (!ctx) throw new Error('useNavigationLoading must be used within NavigationLoadingProvider');
  return ctx;
};
