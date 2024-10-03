import React, { createContext, useState } from 'react';
import { LocalStorageUser, User } from '../common/interfaces';
import AuthContextValues from './interfaces/auth-context.interface';
interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export default function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  const isAuthenticatedUser = (): Boolean => isAuthenticated;

  const removeUserLocalStorage = (): void => localStorage.clear();

  const authenticateUser = (): void => setIsAuthenticated(!isAuthenticated);

  const setUserLocalStorage = (userFull: User): void => {
    const { _id, updatedAt, id_token, createdAt, ...user } = userFull;

    Object.entries(user).forEach(([key, value]) => {
      if (value) localStorage.setItem(key, value as string); //Solo se almacena si existe el valor
    });
  };

  const values: AuthContextValues = {
    isAuthenticatedUser,
    setUserLocalStorage,
    removeUserLocalStorage,
    authenticateUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
