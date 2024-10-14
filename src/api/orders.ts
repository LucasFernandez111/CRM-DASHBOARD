import { BASE_URL, instance } from './base.api';
import { ENDPOINTS } from './endpoints';
import { Order } from './interfaces/order.interface';

const getOrders = (): Promise<Order> => instance.get(ENDPOINTS.ORDERS);

const getPDFOrders = (id: string) => (window.location.href = `${BASE_URL}/${ENDPOINTS.ORDERS_PDF}${id}`);

const deleteOrder = (id: string) => instance.delete(`${ENDPOINTS.ORDERS}/${id}`);

const updateOrder = (id: string, order: any) => instance.put(`${ENDPOINTS.ORDERS}/${id}`, order);

const getOrdersForRange = (startDate: string, endDate: string): Promise<any> =>
  instance.get(`${ENDPOINTS.ORDERS_RANGE}?startDate=${startDate}&endDate=${endDate}`);

export const orders = {
  updateOrder,
  getOrders,
  getPDFOrders,
  deleteOrder,
  getOrdersForRange,
};
