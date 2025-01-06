'use client';
import { Order, OrderItem, orders } from '@/api';
import { DialogComp } from '@/components/DialogComp';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FormCheckBoxStatusOrder } from '@/pages/panel/components/FormCheckBoxStatusOrder';
import React from 'react';
import { BiSolidShow } from 'react-icons/bi';
import { IoPrintSharp } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { ShowFullOrder } from './components/ShowFullOrder';
import { useNotification } from '@/hooks';
import { Badge } from '@/components/ui/badge';

export interface OrderCardProps extends Order {
  onRefresh: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  _id,
  customer,
  items,
  orderStatus,
  orderNumber,
  totalAmount,
  paymentDetails,
  createdAt,
  onRefresh,
}) => {
  const { alertError } = useNotification();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const handleClickPDF = async (_id: string) => {
    try {
      await orders.getPDFOrders(_id);
    } catch (error) {
      alertError('Error al generar el PDF');
    }
  };

  const handleClickDelete = async (_id: string) => {
    try {
      await orders.deleteOrder(_id);
      onRefresh();
    } catch (error) {
      alertError('Error al eliminar el pedido');
    }
  };
  return (
    <Card>
      <CardContent className="flex aspect-square items-center  justify-between p-6 flex-col ">
        <header className="text-3xl font-bold flex items-center  w-full justify-between">
          <div className="flex items-center text-white justify-center bg-sky-600 size-20   rounded-full">
            #{orderNumber}
          </div>
          <div>
            <p>{formatDate(createdAt)}</p>
          </div>
          <MdDeleteForever
            size={65}
            onClick={() => handleClickDelete(_id)}
            className="cursor-pointer transition ease-in-out  hover:-translate-y-1 hover:scale-105 duration-150"
          />
        </header>

        <figure className="flex flex-col items-center text-3xl uppercase ">
          <h1 className="font-bold">{customer.name}</h1>
          <h2>RESUMEN DEL PEDIDO</h2>
        </figure>
        <Separator className="bg-slate-600  bg-opacity-35" />
        <section className="w-full flex space-y-5  flex-col">
          <div className="flex space-x-10 items-center justify-center ">
            <div className="w-2/4 uppercase space-y-2 text-lg antialiased font-normal">
              {items.map(
                (item: OrderItem, i) =>
                  i <= 1 && (
                    <div key={i}>
                      <div>
                        <p>
                          <span className="font-bold text-xl">{item.quantity}</span> X {item.category}
                        </p>
                        <p className="line-clamp-1">{item.subcategory}</p>
                      </div>
                      <Separator className="bg-slate-600 bg-opacity-35" />
                      {i === 1 && (
                        <DialogComp
                          buttonTrigger={
                            <Badge variant="outline" className="cursor-pointer">
                              ver mas...
                            </Badge>
                          }
                          title="DETALLE COMPLETO DEL PEDIDO"
                          description="Revisión de todos los elementos y detalles de tu orden"
                        >
                          <ShowFullOrder
                            customer={customer}
                            items={items}
                            orderNumber={orderNumber}
                            totalAmount={totalAmount}
                            paymentDetails={paymentDetails}
                            onPrint={() => handleClickPDF(_id)}
                          />
                        </DialogComp>
                      )}
                    </div>
                  ),
              )}
            </div>

            <div className="w-2/4 space-y-1 text-center">
              <h1 className="text-5xl font-bold">${totalAmount}</h1>
              <h2 className="text-xl font-extralight">{paymentDetails.method}</h2>
            </div>
          </div>

          <FormCheckBoxStatusOrder orderStatus={orderStatus} id={_id} />
          <div className="flex  items-center justify-around">
            <div className="flex items-center text-white justify-center bg-sky-600 size-12 transition ease-in-out  cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150 rounded-full">
              <DialogComp
                buttonTrigger={<BiSolidShow size={30} />}
                title="DETALLE COMPLETO DEL PEDIDO"
                description="Revisión de todos los elementos y detalles de tu orden"
              >
                <ShowFullOrder
                  customer={customer}
                  items={items}
                  orderNumber={orderNumber}
                  totalAmount={totalAmount}
                  paymentDetails={paymentDetails}
                  onPrint={() => handleClickPDF(_id)}
                />
              </DialogComp>
            </div>
            <div className="flex items-center text-white justify-center bg-sky-600 size-12 transition ease-in-out  cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150    rounded-full">
              <IoPrintSharp size={30} onClick={() => handleClickPDF(_id)} />
            </div>
          </div>
        </section>
        <footer></footer>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
