import { orders, PaymentMethod, OrderStatus } from '@/api';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCategories } from '@/hooks/use-categories';
import {
  CreateOrderType,
  createOrderSchema,
  defaultCreateOrderValues,
} from '@/pages/Orders/schema/form.create.order.schema';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormInputField } from '../../FormInputField';
import { FormSelectField } from '../../FormSelectField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotification } from '@/hooks';

const FormCreateOrder: React.FC<{}> = ({}) => {
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
    // Cambia el tipo a CreateOrderSchema
    try {
      await orders.createOrder(values);
      alertSuccess('Orden creada correctamente');
      form.reset(defaultCreateOrderValues);
    } catch (error) {
      alertError('Error al crear la orden');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4 gap-5">
        {/* <-- Customer --> */}
        <FormField
          control={form.control}
          name="customer.name"
          render={({ field }) => <FormInputField label="Nombre" field={field} type="text" placeholder="Nombre" />}
        />

        <FormField
          control={form.control}
          name="customer.phone"
          render={({ field }) => <FormInputField label="Teléfono" field={field} type="text" placeholder="Teléfono" />}
        />

        {/* <-- Address --> */}
        <FormField
          control={form.control}
          name="customer.address.street"
          render={({ field }) => <FormInputField label="Calle" field={field} type="text" placeholder="Calle 8998" />}
        />

        <FormField
          control={form.control}
          name="customer.address.city"
          render={({ field }) => <FormInputField label="Ciudad" field={field} type="text" placeholder="Ciudad" />}
        />

        <FormField
          control={form.control}
          name="customer.address.postalCode"
          render={({ field }) => (
            <FormInputField label="Código postal" field={field} type="text" placeholder="Código postal" />
          )}
        />

        <FormField
          control={form.control}
          name="customer.address.country"
          render={({ field }) => <FormInputField label="País" field={field} type="text" placeholder="País" />}
        />
        <FormField
          control={form.control}
          name="paymentDetails.method"
          render={({ field }) => (
            <FormSelectField
              placeholder="Método de pago"
              label="Método de pago"
              field={field}
              options={Object.values(PaymentMethod)}
            />
          )}
        />

        <FormField
          control={form.control}
          name="orderStatus"
          render={({ field }) => (
            <FormSelectField
              placeholder="Estado"
              label="Estado del pedido"
              field={field}
              options={Object.values(OrderStatus)}
            />
          )}
        />

        {/* <-- Items --> */}
        {fields.map((field, index) => (
          <section key={field.id} className="col-span-4 grid grid-cols-2 gap-2 border rounded-lg border-gray-300 p-2">
            <FormField
              control={form.control}
              name={`items.${index}.category`}
              render={({ field }) => (
                <FormSelectField placeholder="CATEGORIA" label="CATEGORIA" field={field} options={categories} />
              )}
            />
            <FormField
              control={form.control}
              name={`items.${index}.subcategory`}
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
              name={`items.${index}.quantity`}
              render={({ field }) => <FormInputField placeholder="0" label="Cantidad" field={field} type="number" />}
            />

            <FormField
              control={form.control}
              name={`items.${index}.price`}
              render={({ field }) => <FormInputField placeholder="0" label="Precio" field={field} type="number" />}
            />

            <FormField
              control={form.control}
              name={`items.${index}.description`}
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción..." {...field}></Textarea>
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
        ))}

        <Button
          className="col-span-2"
          type="button"
          onClick={() => append({ category: '', subcategory: '', quantity: 1, price: 1, description: '' })}
        >
          +
        </Button>

        <Button className="col-span-2" type="button" onClick={() => fields.length > 1 && remove(fields.length - 1)}>
          -
        </Button>

        <Button className="col-span-4" type="submit">
          Crear Pedido
        </Button>
      </form>
    </Form>
  );
};

export default FormCreateOrder;
