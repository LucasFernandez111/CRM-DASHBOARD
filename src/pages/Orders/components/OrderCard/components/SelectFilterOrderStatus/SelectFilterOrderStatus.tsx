'use client';
import { Order, OrderStatus } from '@/api';
import { filterOrders } from '@/pages/orders/services/filters';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import React from 'react';

export type SelectFilterOrderStatusProps = {
  orders: Order[];
  handlerSetFilter: (orders: Order[]) => void;
};

const SelectFilterOrderStatus: React.FC<SelectFilterOrderStatusProps> = ({ orders, handlerSetFilter }) => {
  return (
    <Select onValueChange={(status) => handlerSetFilter(filterOrders(orders, 'orderStatus', status))}>
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
  );
};

export default SelectFilterOrderStatus;
