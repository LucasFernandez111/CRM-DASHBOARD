export interface Order {
  userId: string;
  orderNumber: number;
  customer: Customer;
  items: Item[];
  paymentDetails: PaymentDetails;
  totalAmount: number;
  orderStatus: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Customer {
  name: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country?: string;
}

export interface Item {
  category: string;
  subcategory: string;
  description: string;
  quantity: number;
  price: number;
}

export interface PaymentDetails {
  method: string;
  transactionId: string;
  status: string;
}

export interface CreateOrder
  extends Omit<Order, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'userId' | 'orderNumber' | 'totalAmount'> {}
