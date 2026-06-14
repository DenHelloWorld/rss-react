import { useAppDispatch } from '../../store/store.ts';
import { artsApi } from '../../store/arts/arts-api.ts';
import { API_TAGS } from '../../consts/api-tags.const.ts';

export const useInvalidateArtsList = (): (() => void) => {
  const dispatch = useAppDispatch();

  return () =>
    dispatch(
      artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id: API_TAGS.LIST }])
    );
};

export const useInvalidateArtById = (): ((id: number) => void) => {
  const dispatch = useAppDispatch();

  return (id: number) =>
    dispatch(artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id }]));
};
