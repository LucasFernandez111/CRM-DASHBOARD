import { orders, OrderStatus, PaymentMethod } from '@/api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSelectField } from '@/components/FormSelectField';
import { useNotification, useSheetProducts } from '@/hooks';
import {
  createOrderSchema,
  CreateOrderType,
  defaultCreateOrderValues,
} from '@/pages/orders/schema/form.create.order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormInputField } from '../../../../../components/FormInputField';
import { ScrollArea } from '@/components';
import { FormAddItem } from '../../FormAddItem';
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

  const { products } = useSheetProducts();
  const { alertError, alertSuccess } = useNotification();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  useEffect(() => {
    console.log(form.watch());
  }, [form.watch()]);
  const extractPrice = (input: string): number => {
    const sanitizedInput = input.replace(/[^\d.,]/g, '').replace(/,/g, '');
    return parseFloat(sanitizedInput);
  };

  const onSubmit = async (values: CreateOrderType) => {
    console.log(values);

    // try {
    //   await orders.createOrder(values);

    //   alertSuccess('Orden creada correctamente');

    //   form.reset(defaultCreateOrderValues);

    //   onRefresh();
    // } catch (error) {
    //   alertError('Error al crear la orden');
    // }
  };

  const getTotalAmount = () => {
    form.watch('items');

    return form.getValues('items').reduce((total: number, item: any) => total + item.totalAmount, 0);
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
          <FormAddItem fields={fields} form={form} products={products} />
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
          <h1>TOTAL: </h1>
        </section>
        <Button
          type="button"
          onClick={() => append({ category: '', subcategory: '', quantity: 1, price: '', description: '' })}
        >
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
