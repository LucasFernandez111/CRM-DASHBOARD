'use client';
import { OrderCustomer, OrderItem, OrderPaymentDetails } from '@/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-select';
import React from 'react';

export interface ShowFullOrderProps {
  customer: OrderCustomer;
  items: OrderItem[];
  orderNumber: number;
  totalAmount: number;
  paymentDetails: OrderPaymentDetails;
}

const ShowFullOrder: React.FC<ShowFullOrderProps> = ({ customer, items, orderNumber, totalAmount, paymentDetails }) => {
  return (
    <main className="grid grid-cols-1 gap-6 p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{customer.name}</p>
          <p className="text-sm text-gray-700">{customer.phone}</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">Número: {orderNumber}</p>
          <p className="text-sm text-gray-700">Total: ${totalAmount}</p>
          <h3 className="text-base font-medium mt-4">Detalles de artículos</h3>
          <Separator className="my-2" />
          {items.map((item, index) => (
            <div key={index} className="py-2">
              <p className="text-sm text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-700">Cantidad: {item.quantity}</p>
              <p className="text-sm text-gray-700">Precio: ${item.price}</p>
              <Separator className="my-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">Método: {paymentDetails.method}</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            {customer.address.city}, {customer.address.postalCode}, {customer.address.country}
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default ShowFullOrder;
