import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getOrders } from '../../auth/services/loginService';

export const useOrders = () => {
  const { isAuthenticatedUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedUser) return;

    getOrders()
      .then((orders) => setUser(orders))
      .finally(() => setLoading(false));
  }, [isAuthenticatedUser]);

  return {
    user,
    loading,
  };
};
