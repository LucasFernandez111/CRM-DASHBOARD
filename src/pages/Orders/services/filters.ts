import { Order } from '@/api';

const filterOrdersForStatus = (orders: Order[], status: string): Order[] =>
  orders.filter((order: Order) => order.orderStatus === status);

export { filterOrdersForStatus };
