import { CreateOrder } from '@/api/interfaces/order.interface';

export const isOrderValidForCreate = (order: CreateOrder): Boolean =>
  Boolean(
    order &&
      order.items.length > 0 &&
      order.customer &&
      order.customer.name &&
      order.customer.phone &&
      order.customer.address &&
      order.customer.address.street &&
      order.customer.address.city &&
      order.customer.address.postalCode,
  );
