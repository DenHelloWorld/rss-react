import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AICArtwork } from '../services/AICApiService.ts';

interface ArtsState {
  selectedEntities: AICArtwork[];
}

const initialState: ArtsState = {
  selectedEntities: [],
};

const artsSlice = createSlice({
  name: 'Arts',
  initialState,
  reducers: {
    selectOne: (state, action: PayloadAction<AICArtwork>) => {
      return {
        ...state,
        selectedEntities: [...state.selectedEntities, action.payload],
      };
    },
    unselectOne: (state, action: PayloadAction<AICArtwork>) => {
      return {
        ...state,
        selectedEntities: state.selectedEntities.filter(
          (entity) => entity.id !== action.payload.id
        ),
      };
    },
    unselectAll: (state) => {
      return {
        ...state,
        selectedEntities: [],
      };
    },
  },
});

export const { selectOne, unselectOne, unselectAll } = artsSlice.actions;
export default artsSlice.reducer;
