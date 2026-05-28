import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AICArtwork } from '../../services/AICApiService/aic-api-service.ts';

interface ArtsState {
  selectedEntities: AICArtwork[];
}

const initialState: ArtsState = {
  selectedEntities: [],
};

const artsSlice = createSlice({
  name: 'arts',
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
