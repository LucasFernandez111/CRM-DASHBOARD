'use client';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormStatusOrderSchema, FormStatusOrderType } from '@/pages/orders/schema/form-status-order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { useForm } from 'react-hook-form';
import { orders, OrderStatus } from '@/api';
import { useNotification } from '@/hooks';

export type FormCheckBoxStatusOrderProps = {
  id: string;
  orderStatus: OrderStatus;
};

const FormCheckBoxStatusOrder: React.FC<FormCheckBoxStatusOrderProps> = ({ orderStatus, id }) => {
  const { alertSuccess, alertError } = useNotification();
  const form = useForm<FormStatusOrderType>({
    resolver: zodResolver(FormStatusOrderSchema),
    defaultValues: {
      orderStatus: orderStatus,
    },
  });

  const onSubmit = async (data: FormStatusOrderType) => {
    try {
      await orders.updateOrder(id, data);

      alertSuccess('Orden actualizada exitosamente');
      window.location.reload();
    } catch (error) {
      alertError('Error al actualizar la orden');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row justify-center items-center space-x-4">
        <FormField
          control={form.control}
          name="orderStatus"
          render={({ field }) => (
            <FormItem className="flex  flex-row items-center justify-center space-x-4 ">
              <FormControl className="">
                <Checkbox
                  className="size-9"
                  type="submit"
                  checked={field.value === OrderStatus.ENTREGADO}
                  onCheckedChange={(checked) => field.onChange(checked ? OrderStatus.ENTREGADO : OrderStatus.PENDIENTE)}
                />
              </FormControl>
              <FormLabel className="text-2xl font-semibold antialiased">{orderStatus}</FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormCheckBoxStatusOrder;
