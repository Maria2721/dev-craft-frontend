import { createSlice } from '@reduxjs/toolkit';

import type { AIState } from '@/ts/interfaces';

const initialState: AIState = {
  isOpen: false,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    openAI: (state) => {
      state.isOpen = true;
    },
    closeAI: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAI, closeAI } = aiSlice.actions;
export default aiSlice.reducer;
