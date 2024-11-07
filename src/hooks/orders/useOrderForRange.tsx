import { useEffect, useState } from 'react';
import { orders as ordersService } from '@/api';
import { useNotification } from '../notification';
const useOrderForRange = ({ startDate = '', endDate = '' }) => {
  const { alertError } = useNotification();
  const [orders, setOrders] = useState<any[]>([]);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);
  const getOrdersForRange = async () => {
    try {
      const res = await ordersService.getOrdersForRange(startDate, endDate);
      if (res.data?.orders) setOrders(res.data.orders);
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

export default useOrderForRange;
