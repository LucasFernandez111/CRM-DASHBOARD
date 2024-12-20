import { OrdersContext } from '@/context';
import { useContext } from 'react';

export const useOrdersContext = () => useContext(OrdersContext);
