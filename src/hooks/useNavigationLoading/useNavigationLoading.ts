'use client';

import { useContext } from 'react';
import {
  NavigationLoadingContext,
  type NavigationLoadingContextType,
} from '../../context/NavigationLoadingContext/NavigationLoadingContext';

export const useNavigationLoading = (): NavigationLoadingContextType => {
  const ctx = useContext(NavigationLoadingContext);
  if (!ctx) {
    throw new Error(
      'useNavigationLoading must be used within NavigationLoadingProvider'
    );
  }
  return ctx;
};
