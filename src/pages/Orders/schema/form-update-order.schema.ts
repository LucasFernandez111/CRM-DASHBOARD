import { z } from 'zod';

export const UpdateRowsSchema = z.object({
  items: z.array(
    z.object({
      category: z.string().nonempty('La categoría es obligatoria'),
      subcategory: z.string().nonempty('La subcategoría es obligatoria'),
      price: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)))
        .transform((val) => parseFloat(val)),
      stock: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)))
        .transform((val) => parseFloat(val)),
    }),
  ),
});

export const defaultValuesRows = {
  category: '',
  subcategory: '',
  price: 0,
  stock: 0,
};

export const defaultValuesUpdateRows = {
  items: [defaultValuesRows],
};
export type UpdateRowsType = z.infer<typeof UpdateRowsSchema>;
