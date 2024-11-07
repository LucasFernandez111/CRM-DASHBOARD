import { orders, OrderStatus, PaymentMethod } from '@/api';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useNotification } from '@/hooks';
import { useCategories } from '@/hooks/use-categories';
import {
  createOrderSchema,
  CreateOrderType,
  defaultCreateOrderValues,
} from '@/pages/orders/schema/form.create.order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormInputField } from '../../../../../components/FormInputField';
import { FormSelectField } from '../../../../../components/FormSelectField';

type FormCreateOrderProps = {
  onRefresh: () => void;
};

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onRefresh }) => {
  const form = useForm<CreateOrderType>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: defaultCreateOrderValues,
  });

  const { categories, subcategories } = useCategories();
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
      alertError('Error al crear la orden');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3   gap-5 ">
        {/* <-- Customer --> */}
        <FormField
          control={form.control}
          name="customer.name"
          render={({ field }) => (
            <FormInputField label="Nombres" field={field} type="text" placeholder="Nombres" required />
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
            <FormInputField label="Direccion" type="text" field={field} placeholder="Calle 123" required />
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

        <section className=" col-span-3 h-56 overflow-y-auto space-y-8">
          {fields.map((field, i) => (
            <div key={i} className="border rounded-2xl p-6 bg-white shadow-xl grid grid-cols-4  space-x-3 ">
              <FormField
                control={form.control}
                name={`items.${i}.category`}
                render={({ field }) => (
                  <FormSelectField placeholder="CATEGORIA" label="CATEGORIA" field={field} options={categories} />
                )}
              />
              <FormField
                control={form.control}
                name={`items.${i}.subcategory`}
                render={({ field }) => (
                  <FormSelectField
                    placeholder="SUBCATEGORIA"
                    label="SUBCATEGORIA"
                    field={field}
                    options={subcategories}
                  />
                )}
              />

              <FormField
                control={form.control}
                name={`items.${i}.quantity`}
                render={({ field }) => (
                  <FormSelectField
                    placeholder="0"
                    label="CANTIDAD"
                    field={field}
                    options={Array.from({ length: 10 }, (_, i) => (i + 1).toString())} //Crea un Array con valores del 1 a 10
                  />
                )}
              />

              <FormField
                control={form.control}
                name={`items.${i}.price`}
                render={({ field }) => <FormInputField placeholder="0" label="Precio" field={field} type="number" />}
              />

              <FormField
                control={form.control}
                name={`items.${i}.description`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descripción..." {...field}></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </section>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Notas adicionales</FormLabel>
              <FormControl>
                <Textarea placeholder="Notas..." {...field}></Textarea>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="button"
          onClick={() => append({ category: '', subcategory: '', quantity: 1, price: 1, description: '' })}
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
