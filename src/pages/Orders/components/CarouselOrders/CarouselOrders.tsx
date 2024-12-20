'use client';
import { Order } from '@/api';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import React from 'react';
import { OrderCard } from '../OrderCard';
import { GeneralMessage } from '@/components/GeneralMessage';

export type CauroselOrdersProps = {
  orders: Order[];
  onRefresh: () => void;
};

const CauroselOrders: React.FC<CauroselOrdersProps> = ({ orders, onRefresh }) => {
  return (
    <Carousel className="w-full lg:min-w-[1600px] lg:max-w-[1600px]">
      <CarouselContent>
        {orders.length > 0 ? (
          orders.map((order: Order, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
              <OrderCard key={index} {...order} onRefresh={onRefresh} />
            </CarouselItem>
          ))
        ) : (
          <div className="w-full flex items-center justify-center h-96 ">
            <GeneralMessage message="No hay pedidos" />
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CauroselOrders;
