import { instance, BASE_URL } from './base.api';
import { ENDPOINTS } from './endpoints';
import { Order, CreateOrder, UpdateOrder } from './interfaces';

const getOrders = (): Promise<Order> => instance.get(ENDPOINTS.ORDERS);

const createOrder = (order: CreateOrder): Promise<Order> => instance.post(ENDPOINTS.ORDERS, order);

const getPDFOrders = (id: string) => (window.location.href = `${BASE_URL}/${ENDPOINTS.ORDERS_PDF}${id}`);

const deleteOrder = (id: string) => instance.delete(`${ENDPOINTS.ORDERS}/${id}`);

const updateOrder = (id: string, order: UpdateOrder) => instance.put(`orders/${id}`, order);

const getOrdersForRange = (startDate: string, endDate: string): Promise<any> =>
  instance.get(`${ENDPOINTS.ORDERS_RANGE}?startDate=${startDate}&endDate=${endDate}`);

export const orders = {
  updateOrder,
  getOrders,
  getPDFOrders,
  deleteOrder,
  getOrdersForRange,
  createOrder,
};
