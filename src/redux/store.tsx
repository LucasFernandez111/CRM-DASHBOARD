import { User } from '@/api';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user.state';
import { Bot } from '@/api/interfaces';
import { botSlice } from './states/bot.state';

export interface AppStore {
  user: User;
  bot: Bot;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    bot: botSlice.reducer,
  },
});
