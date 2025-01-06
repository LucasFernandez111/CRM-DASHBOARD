import { Bot } from '@/api/interfaces';
import { createSlice } from '@reduxjs/toolkit';

export const BotEmptyState: Bot = {
  _id: '',
  email: '',
  status: true,
};

export const persistLocalStorageUser = (bot: Bot) => localStorage.setItem('bot', JSON.stringify({ ...bot }));

export const clearLocalStorageUser = () => localStorage.removeItem('bot');

export const botSlice = createSlice({
  name: 'bot',
  initialState: localStorage.getItem('bot') ? JSON.parse(localStorage.getItem('bot')!) : BotEmptyState,
  reducers: {
    createBot: (state, action) => {
      console.log(state);

      persistLocalStorageUser(action.payload);
      return action.payload;
    },
    modifyBot: (state, action) => {
      const result = { ...state, ...action.payload };

      persistLocalStorageUser(result);
      return result;
    },
    resetBot: () => {
      clearLocalStorageUser();
      return BotEmptyState;
    },
  },
});

export const { createBot, modifyBot, resetBot } = botSlice.actions;

export default botSlice.reducer;
