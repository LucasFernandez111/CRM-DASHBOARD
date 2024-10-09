import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getStatistics } from '../../auth/services/loginService';

export const useStatistics = () => {
  const { isAuthenticatedUser } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [sales, setSales] = useState(null);
  const [periodSales, setPeriodSales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedUser) return;

    getStatistics()
      .then((statistics) => {
        setStatistics(statistics);
        setSales(statistics.sales);
        setPeriodSales(statistics.sales.periodSales);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticatedUser]);

  return {
    statistics,
    sales,
    periodSales,
    loading,
  };
};
