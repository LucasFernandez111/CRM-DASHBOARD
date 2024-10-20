'use client';
import { orders, Order } from '@/api';
import AppState from '@/common/interfaces/appState.interface';
import { DialogComp } from '@/components/DialogComp';
import { GeneralMessage } from '@/components/GeneralMessage';
import { Button } from '@/components/ui/button';
import { DateContext } from '@/context/DateContextProvider';
import React, { useContext, useEffect, useState } from 'react';
import { OrderCard } from './components/OrderCard';
import { FormCreateOrder } from './components/FormCreateOrder/FormCreateOrder';

const OrdersPage: React.FC<{}> = ({}) => {
  const { dateRange } = useContext(DateContext);
  const [allOrders, setAllOrders] = useState<AppState['order']>(null);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);

  const showOrders = (allOrders: AppState['order']): Boolean => Boolean(allOrders && allOrders.length > 0);

  useEffect(() => {
    orders
      .getOrdersForRange(dateRange.startDate, dateRange.endDate)
      .then((r) => {
        console.log(r);

        setAllOrders(r.data?.orders);
      })
      .catch(() => setError(!error))
      .finally(() => setLoading(!loading));
  }, [dateRange]);

  return (
    <main className="xl:col-span-11 h-full max-h-screen overflow-auto bg-customSteelblue ">
      <div className="p-4 flex  gap-20 items-center justify-center  h-full">
        {showOrders(allOrders) ? (
          allOrders!.map((order: Order) => <OrderCard key={order._id} {...order} />)
        ) : (
          <div className="flex flex-col  justify-center items-center gap-8">
            <GeneralMessage message="Todavia no hay pedidos" />

            <DialogComp title="CREAR PEDIDO" description="Nuevo Pedido" buttonTrigger={<Button>Crear pedido</Button>}>
              <FormCreateOrder />
            </DialogComp>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
