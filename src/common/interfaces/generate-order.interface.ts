export enum OrderStatus {
  PENDIENTE = 'PENDIENTE',
  PROCESANDO = 'PROCESANDO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO',
}
export enum PaymentStatus {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}

export enum PaymentMethod {
  TRANSFERENCIA = 'TRANSFERENCIA',
  EFECTIVO = 'EFECTIVO',
}
export interface GenerateOrder {
  customer: {
    name: string;
    phone: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  items: {
    category: string;
    subcategory: string;
    description: string;
    quantity: number;
    price: number;
  }[];

  paymentDetails: {
    method: PaymentMethod;
    status: PaymentStatus;
  };

  orderStatus: OrderStatus;
}
