import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AIMessage, AIState } from '@/ts/interfaces';

const initialState: AIState = {
  isOpen: false,
  messages: [],
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
    addMessage: (state, action: PayloadAction<AIMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { openAI, closeAI, addMessage, clearMessages } = aiSlice.actions;
export default aiSlice.reducer;
