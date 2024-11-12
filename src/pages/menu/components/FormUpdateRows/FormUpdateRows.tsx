import { sheetProducts } from '@/api';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNotification } from '@/hooks';
import { defaultValuesUpdateRow, UpdateRowsType } from '@/pages/orders/schema/form-update-order.schema';
import { AppStore } from '@/redux/store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export type FormUpdateRowsProps = {
  valueRowSelected: any;
  rangeRowSelected: string;
  onRefresh?: () => void;
};

const FormUpdateRows: React.FC<FormUpdateRowsProps> = ({
  valueRowSelected = defaultValuesUpdateRow,
  rangeRowSelected,
  onRefresh,
}) => {
  const userState = useSelector((state: AppStore) => state.user);
  const { alertError, alertSuccess } = useNotification();
  const form = useForm<UpdateRowsType>({
    defaultValues: {
      row: valueRowSelected,
    },
  });

  const onSubmit = async ({ row }: UpdateRowsType) => {
    try {
      const updatedRows = [Object.values(row)];

      await sheetProducts.updateSheetCategories(userState.sheetId, rangeRowSelected, updatedRows);

      if (onRefresh) onRefresh();
      alertSuccess('Celda actualizada exitosamente');
    } catch (error) {
      alertError('Error al actualizar la celda');
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex space-x-4 ">
          <Input type="text" placeholder="Categoria" {...form.register('row.category')} />
          <Input type="text" placeholder="Subcategoria" {...form.register('row.subcategory')} />
          <Input type="text" placeholder="Precio" {...form.register('row.price')} />
          <Input type="number" placeholder="Stock" {...form.register('row.stock')} />
        </div>
        <div className="flex justify-between">
          <Button variant={'outline'} type="submit" onClick={() => form.reset({ row: defaultValuesUpdateRow })}>
            Eliminar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormUpdateRows;
