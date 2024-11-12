import { z } from 'zod';

export const UpdateRowSchema = z.object({
  row: z.object({
    category: z.string(),
    subcategory: z.string(),
    price: z.string(),
    stock: z.string(),
  }),
});

export const defaultValuesUpdateRow = {
  category: '',
  subcategory: '',
  price: '',
  stock: '',
};
export type UpdateRowsType = z.infer<typeof UpdateRowSchema>;
