import { useEffect, useState } from 'react';
import AppState from '../interfaces/appState.interface';
import { LocalStorageUser } from '../interfaces';

export const useUserStorage = () => {
  const [user, setUser] = useState<AppState['localStorageUser']>('');

  const getItemLocalStorage = (key: string): string => localStorage.getItem(key) || '';

  const getUserLocalStorage = (): LocalStorageUser => {
    return {
      address: getItemLocalStorage('address'),
      email: getItemLocalStorage('email'),
      firstName: getItemLocalStorage('firstName'),
      phone: getItemLocalStorage('phone'),
      company: getItemLocalStorage('company'),
      picture: getItemLocalStorage('picture'),
      sheetId: getItemLocalStorage('sheetId'),
    };
  };

  useEffect(() => {
    setUser(getUserLocalStorage());
  }, []);

  return {
    user,
  };
};
