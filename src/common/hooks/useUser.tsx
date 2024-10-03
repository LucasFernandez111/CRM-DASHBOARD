import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getUser } from '../../auth/services/loginService';
import { User } from '../interfaces';
export const useUser = () => {
  const { isAuthenticatedUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedUser) return;

    getUser()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, [isAuthenticatedUser]);

  return {
    user,
    loading,
  };
};
