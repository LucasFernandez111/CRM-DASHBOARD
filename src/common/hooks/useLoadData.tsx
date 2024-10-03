import { useState, useCallback } from 'react';
import { fetchData } from '../../api/apiService';

export const useLoadData = (user: Partial<AppState['user']> | null) => {
  const [statistics, setStatistics] = useState<AppState['statisticsResponse']>(null);
  const [orders, setOrders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | boolean>(false);

  const loadData = useCallback(async () => {
    if (!user?.email) return; // Solo carga datos si el usuario está autenticado

    try {
      const [statisticsResponse, ordersResponse] = await Promise.all([fetchData('statistics'), fetchData('orders')]);
      setStatistics(statisticsResponse?.data);
      setOrders(ordersResponse?.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { statistics, orders, loading, error, loadData };
};
