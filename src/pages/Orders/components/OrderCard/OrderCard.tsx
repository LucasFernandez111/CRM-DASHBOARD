'use client';
import { Order, orders } from '@/api';
import { DialogComp } from '@/components/DialogComp';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNotification } from '@/hooks';
import { FormCheckBoxStatusOrder } from '@/pages/panel/components/FormCheckBoxStatusOrder';
import React from 'react';
import { BiSolidShow } from 'react-icons/bi';
import { IoPrintSharp } from 'react-icons/io5';
import { LuCalendarClock } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import { ShowFullOrder } from './components/ShowFullOrder';

export interface OrderCardProps extends Order {}

const OrderCard: React.FC<OrderCardProps> = ({
  _id,
  customer,
  items,
  orderStatus,
  orderNumber,
  totalAmount,
  paymentDetails,
  createdAt,
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
      window.location.reload();
    } catch (error) {
      alertError('Error al eliminar el pedido');
    }
  };
  return (
    <Card className="flex flex-col max-w-3xl p-4 space-y-4 ">
      {/* Header */}
      <CardHeader className="flex items-center justify-around flex-row">
        {/* Círculo con Número */}
        <div className="flex items-center justify-center bg-sky-600 size-20 text-2xl rounded-full">
          <span className="text-white font-bold">#{orderNumber}</span>
        </div>

        {/* Fecha con Icono */}
        <div className="flex items-center gap-2">
          <LuCalendarClock className="text-sky-600" size={30} />
          <time className="text-3xl font-bold">{formatDate(createdAt)}</time>
        </div>

        {/* Icono de Eliminación */}
        <MdDeleteForever size={60} color="black" onClick={() => handleClickDelete(_id)} />
      </CardHeader>

      {/* Content */}
      <CardContent className=" flex flex-col space-y-5  uppercase   ">
        <div className="text-center space-y-2  tracking-tight text-3xl">
          <h1 className="font-bold ">{customer.name}</h1>
          <h2 className="over font-extralight">RESUMEN DEL PEDIDO</h2>
          <Separator className="bg-slate-600" />
        </div>

        <div className="flex items-center justify-around text-xl uppercase overflow-y-auto  space-x-5">
          {/* Detalle del Pedido */}
          <div className="text-right space-y-2  ">
            {items.map((item) => (
              <>
                <div className="flex  gap-2 ">
                  <h3>{item.quantity}X</h3>

                  <h3>{item.category}</h3>
                </div>
                <h3 className="text-start">{item.subcategory}</h3>
                <Separator />
              </>
            ))}
          </div>
          <Separator className="bg-slate-600" orientation="vertical" />

          {/* Total y Método de Pago */}
          <div className="space-y-1">
            <h2 className="font-bold text-4xl">${totalAmount}</h2>
            <h3 className="font-extralight text-xl text-sa">{paymentDetails.method}</h3>
          </div>
        </div>

        {/* Estado del Pedido */}
        <div className=" text-2xl tracking-tight">
          <FormCheckBoxStatusOrder orderStatus={orderStatus} _id={_id} />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-center space-x-10">
        <DialogComp
          title="DETALLES DEL PEDIDO"
          description="Detalles del pedido"
          buttonTrigger={
            <div className="cursor-pointer shadow-xl bg-sky-600 flex items-center justify-center size-20 rounded-full hover:transition duration-300 ease-in-out">
              <BiSolidShow size={35} color="white" />
            </div>
          }
        >
          <ShowFullOrder
            customer={customer}
            items={items}
            orderNumber={orderNumber}
            totalAmount={totalAmount}
            paymentDetails={paymentDetails}
          />
        </DialogComp>
        <div
          className=" cursor-pointer shadow-xl bg-sky-600 flex items-center justify-center size-20 rounded-full transition duration-300 ease-in-out"
          onClick={() => handleClickPDF(_id)}
        >
          <IoPrintSharp size={35} color="white" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
