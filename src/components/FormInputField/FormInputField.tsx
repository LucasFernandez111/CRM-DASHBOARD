import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export type FormInputFieldProps = {
  label: string;
  field: ControllerRenderProps<any>;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
};

const FormInputField: React.FC<FormInputFieldProps> = ({ label, field, type, placeholder, required = false }) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input type={type} min={1} minLength={1} placeholder={placeholder || label} {...field} required={required} />
      </FormControl>
    </FormItem>
  );
};

export default FormInputField;
