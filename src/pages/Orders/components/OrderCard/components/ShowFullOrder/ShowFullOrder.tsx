'use client';
import { OrderCustomer, OrderItem, OrderPaymentDetails } from '@/api';
import { ScrollArea } from '@/components';
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
    <div className="flex flex-col space-y-4">
      <header className="flex flex-col items-center text-2xl font-semibold space-y-3">
        <h1>{customer.name}</h1>
        <h2>{customer.phone}</h2>
        <h2>
          {customer.address.city} - {customer.address.street}
        </h2>
        <h2>
          NUMERO DE PEDIDO <span className="text-blue-500 font-bold">#{orderNumber}</span>
        </h2>
      </header>

      <ScrollArea className="h-64 border border-black rounded-3xl">
        {items.map((item: OrderItem, i) => (
          <div key={i}>
            <Separator className="bg-slate-600 bg-opacity-35" />
            <article className="flex justify-around items-center text-2xl font-normal p-3">
              <div>
                <p>
                  {item.quantity} X {item.category}
                </p>
              </div>
              <p>{item.subcategory}</p>

              <p>${item.price}</p>
            </article>
            <Separator className="bg-slate-600 bg-opacity-35" />
          </div>
        ))}
      </ScrollArea>
      <section className="p-2 space-y-2 ">
        <div className="flex flex-col  items-end  font-bold text-3xl mt-8">
          <h1>TOTAL: ${totalAmount}</h1>
          <h1>{paymentDetails.method}</h1>
        </div>

        <div className="flex flex-col text-center text-2xl font-extralight  ">
          <p>Muchas gracias, esperamos que disfruten de su comida.</p>
          <p>Bon appétit ;D</p>
        </div>
      </section>

      <figure className="flex justify-center items-center">
        <div
          onClick={onPrint}
          className="flex items-center text-white justify-center bg-sky-600 size-20 transition ease-in-out  cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150    rounded-full"
        >
          <IoPrintSharp size={40} />
        </div>
      </figure>

      <footer className="text-center text-xl font-extralight">
        <h1>SISTEMA REALIZADO POR OKEYCORP.COM</h1>
      </footer>
    </div>
  );
};

export default ShowFullOrder;
