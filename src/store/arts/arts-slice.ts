import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AICArtwork } from './arts-api.ts';

interface ArtsState {
  selectedEntities: AICArtwork[];
}

const initialState: ArtsState = {
  selectedEntities: [],
};

const artsSlice = createSlice({
  name: 'artsSlice',
  initialState,
  reducers: {
    toggleSelect: (state, action: PayloadAction<AICArtwork>) => {
      const index = state.selectedEntities.findIndex(
        (entity) => entity.id === action.payload.id
      );

      if (index === -1) {
        state.selectedEntities.push(action.payload);
      } else {
        state.selectedEntities.splice(index, 1);
      }
    },
    unselectAll: (state) => {
      state.selectedEntities = [];
    },
  },
});

export const { toggleSelect, unselectAll } = artsSlice.actions;
export default artsSlice.reducer;
