'use client';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { FormSelectField } from '@/components/FormSelectField';

import { Product } from '@/api';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateOrderType } from '../../schema/form.create.order.schema';
import { useSheetProducts } from '@/hooks';
import { MdPriceChange } from 'react-icons/md';
export type FormAddItemProps = {
  fields: any;
  form: UseFormReturn<CreateOrderType>;
};

const FormAddItem: React.FC<FormAddItemProps> = ({ fields, form }) => {
  const { products } = useSheetProducts();

  const [productsList, setProductsList] = useState([]);

  const getSubcategories = (category: string) =>
    products.find((product: Product) => product.category === category)?.subcategory;

  const getPrice = (category: string, subcategory: string) => {
    const subcategories = getSubcategories(category);

    return subcategories?.find((sub) => sub.name === subcategory)?.price;
  };

  return (
    <div className="space-y-4">
      {fields.map((_: any, i: number) => (
        <div key={i} className="border rounded-2xl p-6 bg-white  grid  grid-cols-4 space-x-2 ">
          <FormField
            control={form.control}
            name={`items.${i}.category`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(category) => {
                      return field.onChange(category);
                    }}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione una categoria" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {products.length > 0 &&
                          products.map((product: Product, i: number) => (
                            <SelectItem key={i} value={product.category}>
                              {product.category}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`items.${i}.subcategory`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategoria</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(subcategory) => {
                      return field.onChange(subcategory);
                    }}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione una subcategoria" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {getSubcategories(form.watch(`items.${i}.category`)) &&
                          getSubcategories(form.watch(`items.${i}.category`))!.map((sub) => {
                            return (
                              <SelectItem key={sub.name} value={sub.name}>
                                {sub.name}
                              </SelectItem>
                            );
                          })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`items.${i}.quantity`}
            render={({ field }) => (
              <FormSelectField
                label="Cantidad"
                field={field}
                options={Array.from({ length: 10 }, (_, i) => (i + 1).toString())} //Crea un Array con valores del 1 a 10
              />
            )}
          />
          <div className="flex items-end justify-start gap-2">
            {/* <Button
              size="sm"
              variant={automaticPrice ? 'outline' : 'default'}
              onClick={() => setAutomaticPrice(!automaticPrice)}
            >
              <MdPriceChange color={automaticPrice ? 'black' : ''} />
            </Button> */}

            <FormField
              control={form.control}
              name={`items.${i}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormAddItem;
