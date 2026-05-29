import { useCallback } from 'react';
import { useAppDispatch } from '../../store/store.ts';
import { artsApi } from '../../store/arts/arts-api.ts';
import { API_TAGS } from '../../consts/api-tags.const.ts';

export const useInvalidateArtsList = (): (() => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    () =>
      void dispatch(
        artsApi.util.invalidateTags([
          { type: API_TAGS.ARTS, id: API_TAGS.LIST },
        ])
      ),
    [dispatch]
  );
};

export const useInvalidateArtById = (): ((id: number) => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (id: number) =>
      void dispatch(artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id }])),
    [dispatch]
  );
};
