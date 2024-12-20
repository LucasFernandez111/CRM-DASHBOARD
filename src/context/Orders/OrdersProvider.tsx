'use client';
import React, { createContext, useEffect, useState } from 'react';
import { Order, orders } from '@/api';
import { OrdersContextType } from './types';

export type OrdersProviderProps = {
  children: React.ReactNode;
};

export const OrdersContext = createContext({} as OrdersContextType);

const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const [ordersContext, setOrdersContext] = useState<Order[]>([]);

  useEffect(() => {
    orders.getOrders().then((r) => handleOrders(r.data));
  }, []);

  const handleOrders = (orders: Order[]) => setOrdersContext(orders);

  return <OrdersContext.Provider value={{ ordersContext, handleOrders }}>{children}</OrdersContext.Provider>;
};

export default OrdersProvider;
