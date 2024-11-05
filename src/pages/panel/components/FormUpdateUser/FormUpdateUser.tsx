'use client';
import { FormInputField } from '@/components/FormInputField';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useNotification } from '@/hooks';
import { UserUpdateSchema, UserUpdateType } from '@/pages/orders/schema/form.update.user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isEmptyObject } from '../../utils';
import { users } from '@/api';
import { useDispatch } from 'react-redux';
import { modifyUser } from '@/redux/states';

const FormUpdateUser: React.FC<{}> = ({}) => {
  const { alertError, alertSuccess } = useNotification();
  const dispatch = useDispatch();
  const form = useForm<UserUpdateType>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      phone: '',
      address: '',
      company: '',
      sheetId: '',
    },
  });
  useEffect(() => {
    if (!isEmptyObject(form.formState.errors)) {
      const errorMessages = Object.values(form.formState.errors);
      errorMessages.forEach((error) => error.message && alertError(error.message));
    }
  }, [form.formState.errors]);

  const onSubmit = async (user: UserUpdateType) => {
    // Filtrar solo los campos que tienen valores
    const updatedUser = Object.fromEntries(Object.entries(user).filter(([_, value]) => value !== ''));

    try {
      const result = await users.updateUser(updatedUser as UserUpdateType);
      console.log(result);

      dispatch(modifyUser(updatedUser as UserUpdateType));
      alertSuccess('Usuario actualizado exitosamente');
    } catch (error) {
      alertError('Error al actualizar el usuario');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5 ">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => <FormInputField label="Telefono" field={field} type="text" />}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => <FormInputField label="Direccion" field={field} type="text" />}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => <FormInputField label="Compania" field={field} type="text" />}
        />
        <FormField
          control={form.control}
          name="sheetId"
          render={({ field }) => <FormInputField label="ID sheet" field={field} type="text" />}
        />

        <Button type="submit" className="col-span-1  ">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default FormUpdateUser;
