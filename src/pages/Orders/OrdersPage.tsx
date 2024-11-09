'use client';
import { Order } from '@/api';
import { DialogComp } from '@/components/DialogComp';
import { GeneralMessage } from '@/components/GeneralMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DateContext } from '@/context/DateContextProvider';
import useOrderForRange from '@/hooks/orders/useOrderForRange';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { CauroselOrders } from './components/CarouselOrders';
import { FormCreateOrder } from './components/FormCreateOrder/FormCreateOrder';
import { SelectFilterOrderStatus } from './components/OrderCard/components/SelectFilterOrderStatus';
import { filterOrders } from './services/filters';

const OrdersPage: React.FC<{}> = ({}) => {
  const { dateRange } = useContext(DateContext);
  const { orders, handleRefresh } = useOrderForRange(dateRange);
  const [ordersFiltered, setOrdersFiltered] = useState<Order[]>(orders);

  useEffect(() => {
    setOrdersFiltered(orders);
  }, [orders]);

  const handleOrdersFiltered = (ordersFiltered: Order[]) => setOrdersFiltered(ordersFiltered);

  return (
    <main className="xl:col-span-11 h-full max-h-screen overflow-hidden bg-customSteelblue   items-center justify-center flex">
      {orders.length > 0 ? (
        <div className="flex items-end flex-col gap-3 ">
          <div className="flex items-center justify-between w-full">
            <SelectFilterOrderStatus handlerSetFilter={handleOrdersFiltered} orders={orders} />
            <div className=" w-56">
              <Input
                type="number"
                min={1}
                placeholder="FILTRAR POR NUMERO"
                onChange={(e) => {
                  e.target.value
                    ? handleOrdersFiltered(filterOrders(orders, 'orderNumber', Number(e.target.value)))
                    : handleOrdersFiltered(orders);
                }}
              />
            </div>
            <DialogComp buttonTrigger={<Button variant="outline">CREAR PEDIDO</Button>}>
              <FormCreateOrder onRefresh={handleRefresh} />
            </DialogComp>
          </div>

          <CauroselOrders orders={ordersFiltered} />
        </div>
      ) : (
        <section className="flex flex-col items-center space-y-3">
          <GeneralMessage message="Todavia no hay pedidos" />
          <DialogComp
            buttonTrigger={
              <IoIosAddCircle
                size={120}
                className="transition ease-in-out  cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150"
                color="white"
              />
            }
          >
            <FormCreateOrder onRefresh={handleRefresh} />
          </DialogComp>
        </section>
      )}
    </main>
  );
};

export default OrdersPage;
