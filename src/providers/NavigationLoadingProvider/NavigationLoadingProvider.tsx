'use client';

import { useState, type ReactNode } from 'react';
import { NavigationLoadingContext } from '../../context/NavigationLoadingContext/NavigationLoadingContext';

export const NavigationLoadingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  return (
    <NavigationLoadingContext.Provider
      value={{ isNavigating, setIsNavigating }}
    >
      {children}
    </NavigationLoadingContext.Provider>
  );
};
