import { Order } from '@/api';

export type OrdersContextType = {
  ordersContext: Order[];
  handleOrders: (orders: Order[]) => void;
};
