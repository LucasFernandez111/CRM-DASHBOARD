export enum OrderStatus {
  PENDIENTE = 'PENDIENTE',
  PROCESANDO = 'PROCESANDO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO',
}

export enum PaymentStatus {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
  FALLIDO = 'FALLIDO',
}

export enum PaymentMethod {
  TRANSFERENCIA = 'TRANSFERENCIA',
  EFECTIVO = 'EFECTIVO',
}
export interface Order {
  userId: string;
  orderNumber: number;
  customer: OrderCustomer;
  items: OrderItem[];
  paymentDetails: OrderPaymentDetails;
  totalAmount: number;
  orderStatus: OrderStatus;
  _id: string;
  createdAt: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: OrderAddress;
}

export interface OrderAddress {
  street: string;
  city: string;
  postalCode: string;
  country?: string;
}

export interface OrderItem {
  category: string;
  subcategory: string;
  description: string;
  quantity: number;
  price: number;
}

export interface OrderPaymentDetails {
  method: string;
  transactionId?: string;
  status?: string;
}

export interface CreateOrder
  extends Omit<Order, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'userId' | 'orderNumber' | 'totalAmount'> {}

export interface UpdateOrder extends Partial<Order> {}
