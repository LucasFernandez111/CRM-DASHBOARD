import { User } from '@/api';
import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState: User = {
  _id: '',
  id_token: '',
  refresh_token: '',
  picture: '',
  firstName: '',
  email: '',
  sheetId: '',
  company: null,
  phone: null,
  address: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const persistLocalStorageUser = (user: User) => localStorage.setItem('user', JSON.stringify({ ...user }));

export const clearLocalStorageUser = () => localStorage.removeItem('user');

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : UserEmptyState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorageUser(action.payload);
      return action.payload;
    },
    modifyUser: (state, action) => {
      const result = { ...state, ...action.payload };

      persistLocalStorageUser(result);
      return result;
    },
    resetUser: () => {
      clearLocalStorageUser();
      return UserEmptyState;
    },
  },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
