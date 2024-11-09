import { Order } from '@/api';

type FilterKey = keyof Order;

const filterOrders = (orders: Order[], filterKey: FilterKey, filterValue: string | number): Order[] => {
  return orders.filter((order: Order) => order[filterKey] === filterValue);
};
export { filterOrders };
