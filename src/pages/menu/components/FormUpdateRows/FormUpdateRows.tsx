import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  defaultValuesRows,
  defaultValuesUpdateRows,
  UpdateRowsType,
} from '@/pages/orders/schema/form-update-order.schema';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export type FormUpdateRowsProps = {};

const FormUpdateRows: React.FC<FormUpdateRowsProps> = () => {
  const form = useForm<UpdateRowsType>({
    defaultValues: defaultValuesUpdateRows,
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        {fields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-4 space-x-3">
            <Input
              placeholder="Categoria"
              {...form.register(`items.${i}.category` as const, {
                required: true,
              })}
            />

            <Input
              placeholder="Subcategoria"
              {...form.register(`items.${i}.subcategory` as const, {
                required: true,
              })}
            />

            <Input
              placeholder="Precio"
              {...form.register(`items.${i}.price` as const, {
                required: true,
              })}
            />

            <Input
              placeholder="Stock"
              {...form.register(`items.${i}.stock` as const, {
                required: true,
              })}
            />
          </div>
        ))}
        <Button type="submit">Enviar</Button>
        <Button onClick={() => append(defaultValuesRows)}>ADD</Button>
      </form>
    </Form>
  );
};

export default FormUpdateRows;
