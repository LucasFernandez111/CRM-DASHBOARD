'use client';
import { FormField, FormItem, FormLabel, FormControl, Input, Textarea, Button } from '@/components';
import { FormSelectField } from '@/components/FormSelectField';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components';

import React, { useEffect, useState } from 'react';
import { Product } from '@/api';
import { UseFormReturn } from 'react-hook-form';
import { CreateOrderType } from '../../schema/form.create.order.schema';

export type FormAddItemProps = {
  fields: any;
  form: UseFormReturn<CreateOrderType>;
  products: any;
};

const FormAddItem: React.FC<FormAddItemProps> = ({ fields, form, products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    category: '',
    subcategories: [],
    prices: [],
  });
  const [price, setPrice] = useState<string[]>(['']);
  const [editPrice, setEditPrice] = useState<boolean>(false);

  const handleOnValueChange = (category: string): void => {
    const product = getSelectedProduct(category, products);

    if (product) setSelectedProduct({ ...product });
  };

  const getSubcategoryPrice = (product: Product, subcategory: string) => {
    const index = product.subcategories.indexOf(subcategory);

    return product.prices[index];
  };

  const getSelectedProduct = (category: string, products: Product[]) =>
    products.find((product: Product) => product.category == category);

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
                      handleOnValueChange(category);
                      return field.onChange(category);
                    }}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
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
                      setPrice([...price, getSubcategoryPrice(selectedProduct, subcategory)]);

                      return field.onChange(subcategory);
                    }}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {selectedProduct &&
                          selectedProduct.subcategories.map((subcategory: string, i: number) => (
                            <SelectItem key={i} value={subcategory}>
                              {subcategory}
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
            <Button type="button" className="w-16" variant={'outline'} onClick={() => setEditPrice(!editPrice)}>
              editar
            </Button>
            <FormField
              control={form.control}
              name={`items.${i}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="text" value={() => form.setValue(`items.${i}.price`, price[i])} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`items.${i}.description`}
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormControl>
                  <Textarea className="mt-4" placeholder="Descripción..." {...field}></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default FormAddItem;
