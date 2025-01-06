import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import React from 'react';

export type FormSelectFieldProps = {
  label: string;
  field: any;
  placeholder?: string | number;
  disable?: boolean;
  options: string[];
  className?: string;
};

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  label,
  field,
  placeholder,
  options,
  disable,
  className,
}) => {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} value={field.value} disabled={disable}>
          <SelectTrigger className="w-full">
            {placeholder ? <SelectValue placeholder={placeholder} /> : <SelectValue />}
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {options.length > 0 &&
                options.map((option, i) => (
                  <SelectItem key={i} value={option}>
                    {option}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
};

export default FormSelectField;
