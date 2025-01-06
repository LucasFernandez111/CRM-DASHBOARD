import { orders, OrderStatus, PaymentMethod } from '@/api';
import { ScrollArea } from '@/components';
import { FormSelectField } from '@/components/FormSelectField';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useNotification } from '@/hooks';
import {
  createOrderSchema,
  CreateOrderType,
  defaultCreateOrderValues,
} from '@/pages/orders/schema/form.create.order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormInputField } from '../../../../../components/FormInputField';
import { FormAddItem } from '../../FormAddItem';
import { sanitizedStringToNumber } from '@/utils/sanitizeds';
import { useEffect } from 'react';

type FormCreateOrderProps = {
  onRefresh: () => void;
};

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onRefresh }) => {
  const form = useForm<CreateOrderType>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: defaultCreateOrderValues,
    mode: 'onTouched',
  });

  const { alertError, alertSuccess } = useNotification();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = async (values: CreateOrderType) => {
    try {
      await orders.createOrder(values);

      alertSuccess('Orden creada correctamente');

      form.reset(defaultCreateOrderValues);

      onRefresh();
    } catch (error) {
      console.log(error);

      alertError('Error al crear la orden');
    }
  };

  useEffect(() => {
    console.log(form.watch('items'));
    console.log(form.formState.errors);
  });

  const getTotalAmount = () => {
    return (
      form.getValues('items').reduce((total: number, item: any) => {
        if (typeof item.price == 'string') return total + sanitizedStringToNumber(item.price);
        return total + item.price;
      }, 0) || 0
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3   gap-5 ">
        {/* <-- Customer --> */}
        <FormField
          control={form.control}
          name="customer.name"
          render={({ field }) => (
            <FormInputField label="Nombre" field={field} type="text" placeholder="Nombre" required />
          )}
        />

        <FormField
          control={form.control}
          name="customer.phone"
          render={({ field }) => (
            <FormInputField label="Telefono" type="text" field={field} placeholder="Telefono" required />
          )}
        />

        <FormField
          control={form.control}
          name="customer.address.street"
          render={({ field }) => (
            <FormInputField label="Dirección" type="text" field={field} placeholder="Calle 123" required />
          )}
        />

        <FormField
          control={form.control}
          name="customer.address.city"
          render={({ field }) => (
            <FormInputField label="Localidad" type="text" field={field} placeholder="CABA" required />
          )}
        />

        <FormField
          control={form.control}
          name="paymentDetails.method"
          render={({ field }) => (
            <FormSelectField label="Metodo de pago" field={field} options={Object.values(PaymentMethod)} />
          )}
        />

        <FormField
          control={form.control}
          name="orderStatus"
          render={({ field }) => (
            <FormSelectField label="Estado de la orden" field={field} options={Object.values(OrderStatus)} />
          )}
        />

        <ScrollArea className="col-span-3 h-80 border p-4 rounded-lg">
          <FormAddItem fields={fields} form={form} />
        </ScrollArea>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <Textarea placeholder="Notas adicionales" {...field}></Textarea>
              </FormControl>
            </FormItem>
          )}
        />

        <section className="flex items-end justify-end col-span-3 pr-3  ">
          <h1>
            TOTAL: <span className="font-black">${getTotalAmount()}</span>{' '}
          </h1>
        </section>
        <Button type="button" onClick={() => append({ category: '', subcategory: '', quantity: 1, price: 0 })}>
          +
        </Button>

        <Button type="button" onClick={() => fields.length > 1 && remove(fields.length - 1)}>
          -
        </Button>

        <Button type="submit">Crear Pedido</Button>
      </form>
    </Form>
  );
};

export default FormCreateOrder;
