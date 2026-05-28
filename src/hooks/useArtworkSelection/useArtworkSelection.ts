import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { useCallback } from 'react';
import { type AICArtwork } from '../../services/AICApiService/aic-api-service.ts';
import { toggleSelect, unselectAll } from '../../store/arts/arts-slice.ts';

export const useArtworkSelection = (): {
  selectedEntities: AICArtwork[];
  count: number;
  toggle: (entity: AICArtwork) => void;
  clearAll: () => void;
  isSelected: (id: number | string) => boolean;
} => {
  const dispatch = useAppDispatch();

  const selectedEntities: AICArtwork[] = useAppSelector(
    (store) => store.arts.selectedEntities
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

  const toggle = useCallback(
    (entity: AICArtwork) => {
      dispatch(toggleSelect(entity));
    },
    [dispatch]
  );

  return {
    selectedEntities,
    count: selectedEntities.length,
    toggle,
    clearAll,
    isSelected,
  };
};
