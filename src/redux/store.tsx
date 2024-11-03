import { User } from '@/api';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user.state';

export interface AppStore {
  user: User;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
  },
});
