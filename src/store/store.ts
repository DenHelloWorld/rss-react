import { configureStore } from '@reduxjs/toolkit';
import artsSlice from './arts/arts-slice.ts';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { artsApi } from './arts/arts-api.ts';

export const store = configureStore({
  reducer: {
    arts: artsSlice,
    [artsApi.reducerPath]: artsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artsApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
