import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/store.ts';
import { useCallback } from 'react';
import { type AICArtwork } from '../services/AICApiService.ts';
import { selectOne, unselectAll, unselectOne } from '../store/artsSlice.ts';

export const useArtworkSelection = (): {
  selectedEntities: AICArtwork[];
  count: number;
  select: (entity: AICArtwork) => void;
  unselect: (entity: AICArtwork) => void;
  clearAll: () => void;
  isSelected: (id: number | string) => boolean;
} => {
  const dispatch = useDispatch();

  const selectedEntities: AICArtwork[] = useAppSelector(
    (store) => store.arts.selectedEntities
  );

  const select = useCallback(
    (entity: AICArtwork) => {
      dispatch(selectOne(entity));
    },
    [dispatch]
  );

  const unselect = useCallback(
    (entity: AICArtwork) => {
      dispatch(unselectOne(entity));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(unselectAll());
  }, [dispatch]);

  const isSelected = useCallback(
    (id: number | string) => {
      return selectedEntities.some((entity) => entity.id === id);
    },
    [selectedEntities]
  );

  return {
    selectedEntities,
    count: selectedEntities.length,
    select,
    unselect,
    clearAll,
    isSelected,
  };
};
