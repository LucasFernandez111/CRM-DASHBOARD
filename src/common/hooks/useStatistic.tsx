import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getStatistics } from '../../auth/services/loginService';

export const useStatistics = () => {
  const { isAuthenticatedUser } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedUser) return;

    getStatistics()
      .then((statistics) => setStatistics(statistics))
      .finally(() => setLoading(false));
  }, [isAuthenticatedUser]);

  return {
    statistics,
    loading,
  };
};
