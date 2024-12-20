'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { GoListOrdered } from 'react-icons/go';
export type LastestOrdersProps = {
  // types...
};

const LastestOrders: React.FC<LastestOrdersProps> = ({}) => {
  return (
    <Card className="space-y-4 ">
      <CardHeader>
        <div className="flex items-center space-x-1">
          <GoListOrdered size={40} color="#2563eb" />
          <CardTitle className="font-bold text-5xl">ULTIMOS PEDIDOS</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <section className="grid grid-cols-3">
          <div className="bg-customSteelblue size-60 rounded-2xl"></div>
          <div className="bg-customSteelblue size-60 rounded-2xl"></div>
          <div className="bg-customSteelblue size-60 rounded-2xl"></div>
        </section>
      </CardContent>
    </Card>
  );
};

export default LastestOrders;
