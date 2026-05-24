import { useAppDispatch, useAppSelector } from '../store/store.ts';
import { useCallback } from 'react';
import { type AICArtwork } from '../services/AICApiService/aic-api-service.ts';
import {
  selectOne,
  unselectAll,
  unselectOne,
} from '../store/arts/arts-slice.ts';

export const useArtworkSelection = (): {
  selectedEntities: AICArtwork[];
  count: number;
  select: (entity: AICArtwork) => void;
  unselect: (entity: AICArtwork) => void;
  toggle: (entity: AICArtwork) => void;
  clearAll: () => void;
  isSelected: (id: number | string) => boolean;
} => {
  const dispatch = useAppDispatch();

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

  const toggle = useCallback(
    (entity: AICArtwork) => {
      if (isSelected(entity.id)) {
        unselect(entity);
      } else {
        select(entity);
      }
    },
    [unselect, isSelected, select]
  );

  return {
    selectedEntities,
    count: selectedEntities.length,
    select,
    unselect,
    toggle,
    clearAll,
    isSelected,
  };
};
