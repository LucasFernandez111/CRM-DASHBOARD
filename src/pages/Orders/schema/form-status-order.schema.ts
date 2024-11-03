import { OrderStatus } from '@/api';
import { z } from 'zod';

export const FormStatusOrderSchema = z.object({
  orderStatus: z.nativeEnum(OrderStatus).default(OrderStatus.PENDIENTE),
});

export type FormStatusOrderType = z.infer<typeof FormStatusOrderSchema>;
