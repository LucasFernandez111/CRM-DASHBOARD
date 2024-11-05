'use client';
import { OrderCustomer, OrderItem, OrderPaymentDetails } from '@/api';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { IoPrintSharp } from 'react-icons/io5';

export interface ShowFullOrderProps {
  customer: OrderCustomer;
  items: OrderItem[];
  orderNumber: number;
  totalAmount: number;
  paymentDetails: OrderPaymentDetails;
  onPrint: () => void;
}

const ShowFullOrder: React.FC<ShowFullOrderProps> = ({
  onPrint,
  customer,
  items,
  orderNumber,
  totalAmount,
  paymentDetails,
}) => {
  return (
    <main className="flex flex-col space-y-9  items-center  ">
      {/* Informacion del cliente */}
      <section className="flex items-center flex-col font-semibold text-3xl  space-y-2">
        <h1>{customer.name}</h1>
        <h2>{customer.phone}</h2>
        <h2>
          {customer.address.street} - {customer.address.postalCode}{' '}
        </h2>
        <h1>Numero de PEDIDO # {orderNumber}</h1>
      </section>

      <Separator />
      {/* Pedidos  */}
      <section className="text-xl font-normal space-y-10">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-3 ">
            <h1>
              {item.quantity} X {item.category} {item.subcategory}
            </h1>

            <p className="line-clamp-2 text-wrap"> {item.description}</p>

            <h2>${item.price}</h2>
          </div>
        ))}
      </section>
      <Separator />
      <section className="flex   w-full  justify-between p-6 text-3xl ">
        <div
          className=" cursor-pointer shadow-xl bg-sky-600 flex items-center justify-center size-20 rounded-full transition duration-300 ease-in-out"
          onClick={onPrint}
        >
          <IoPrintSharp size={40} color="white" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold">TOTAL ${totalAmount}</h1>
          <p className="font-extralight">{paymentDetails.method}</p>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center space-x-5 font-extralight text-2xl">
        <h1>Muchas gracias, esperamos que disfruten de su comida.</h1>
        <h2>Bon appétit ;D</h2>

        <h1 className="mt-16 text-xl">SISTEMA REALIZADO POR OKEYCORP.COM</h1>
      </footer>
    </main>
  );
};

export default ShowFullOrder;
