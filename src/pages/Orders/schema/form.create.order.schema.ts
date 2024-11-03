import { PaymentMethod, OrderStatus } from '@/api';
import { z } from 'zod';

const itemSchema = z.object({
  category: z.string().default(''),
  subcategory: z.string().default(''),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), { message: 'La cantidad debe ser un número' })
    .transform((val) => parseFloat(val)),
  quantity: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), { message: 'La cantidad debe ser un número' })
    .transform((val) => parseFloat(val)),
  description: z.string().default(''),
});

const addressSchema = z.object({
  street: z.string().default(''),
  city: z.string().default(''),
  postalCode: z.string().default(''),
  country: z.string().default(''),
});

const customerSchema = z.object({
  name: z.string().default(''),
  phone: z.string().default(''),
  address: addressSchema,
});

const paymentDetailsSchema = z.object({
  method: z.nativeEnum(PaymentMethod),
});

export const createOrderSchema = z.object({
  customer: customerSchema,
  items: z.array(itemSchema),
  paymentDetails: paymentDetailsSchema,
  orderStatus: z.nativeEnum(OrderStatus).default(OrderStatus.PENDIENTE),
  notes: z.string().default(''),
});

export const defaultCreateOrderValues: CreateOrderType = {
  customer: {
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
  },
  items: [
    {
      category: '',
      subcategory: '',
      description: '',
      quantity: 1,
      price: 1,
    },
  ],
  paymentDetails: {
    method: PaymentMethod.TRANSFERENCIA,
  },
  orderStatus: OrderStatus.PENDIENTE,
  notes: '',
};

export type CreateOrderType = z.infer<typeof createOrderSchema>;
