'use client';
import { Order, OrderStatus } from '@/api';
import { DialogComp } from '@/components/DialogComp';
import { GeneralMessage } from '@/components/GeneralMessage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateContext } from '@/context/DateContextProvider';
import useOrderForRange from '@/hooks/orders/useOrderForRange';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { CauroselOrders } from './components/CarouselOrders';
import { FormCreateOrder } from './components/FormCreateOrder/FormCreateOrder';
import { filterOrdersForStatus } from './services/filters';

const OrdersPage: React.FC<{}> = ({}) => {
  const { dateRange } = useContext(DateContext);
  const { orders, handleRefresh } = useOrderForRange(dateRange);
  const [ordersFiltered, setOrdersFiltered] = useState<Order[]>(orders);

  useEffect(() => {
    setOrdersFiltered(orders);
  }, [orders]);

  return (
    <main className="xl:col-span-11 h-full max-h-screen overflow-hidden bg-customSteelblue   items-center justify-center flex">
      {orders.length > 0 ? (
        <div className="flex items-end flex-col gap-3 ">
          <div className="flex items-center justify-between w-full">
            <Select onValueChange={(status) => setOrdersFiltered(filterOrdersForStatus(orders, status))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="FILTRAR ESTADO" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(OrderStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
