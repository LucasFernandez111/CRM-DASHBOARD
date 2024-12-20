import { useEffect, useState } from 'react';
import { orders as ordersService } from '@/api';
import { useOrdersContext } from './useOrdersContext';
import { useNotification } from '../notification/useNotification';
export const useOrderForRange = ({ startDate = '', endDate = '' }) => {
  const { alertError } = useNotification();
  const { handleOrders } = useOrdersContext();
  const [orders, setOrders] = useState<any[]>([]);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);
  const getOrdersForRange = async () => {
    try {
      const res = await ordersService.getOrdersForRange(startDate, endDate);
      console.log(res);

      if (res.data?.orders) {
        setOrders(res.data.orders);
        handleOrders(res.data.orders);
      }
    } catch (error) {
      alertError('Error al cargar las ordenes');
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    if (startDate && endDate) getOrdersForRange();
    return () => abortController.abort();
  }, [refresh, startDate, endDate]);

  return {
    orders,
    handleRefresh,
  };
};
