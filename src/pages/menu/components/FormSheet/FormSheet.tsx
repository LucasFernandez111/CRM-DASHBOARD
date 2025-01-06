import { sheetProducts } from '@/api';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNotification } from '@/hooks/notification/useNotification';
import { defaultValuesUpdateRow, UpdateRowsType } from '@/pages/orders/schema/form-update-order.schema';
import { AppStore } from '@/redux/store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FaSave } from 'react-icons/fa';

export type FormUpdateRowsProps = {
  valueRowSelected: any;
  rangeRowSelected: string;
  action: 'add' | 'update';
  onRefresh?: () => void;
};

const FormSheet: React.FC<FormUpdateRowsProps> = ({
  valueRowSelected = defaultValuesUpdateRow,
  rangeRowSelected,
  action,
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
      if (action === 'add') {
        await sheetProducts.addSheetProducts(userState.sheetId, Object.values(row));
        alertSuccess('Productos agregados correctamente');
      }

      if (action === 'update') {
        await sheetProducts.updateSheetCategories(userState.sheetId, rangeRowSelected, [Object.values(row)]);
        alertSuccess('Celda actualizada exitosamente');
      }

      if (onRefresh) onRefresh();
    } catch (error) {
      console.log(error);

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
          <Button type="submit">
            <FaSave color="white" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSheet;
