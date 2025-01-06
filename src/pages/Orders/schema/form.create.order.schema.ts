import { PaymentMethod, OrderStatus } from '@/api';
import { sanitizedStringToNumber } from '@/utils/sanitizeds';
import { z } from 'zod';

// Esquema para items
const itemSchema = z.object({
  category: z.string().min(1, 'La categoría es obligatoria'),
  subcategory: z.string().min(1, 'La subcategoría es obligatoria'),
  price: z.string().transform((val) => sanitizedStringToNumber(val)),

  quantity: z
    .string()
    .min(1, 'El precio es obligatorio')
    .refine((val) => !isNaN(parseFloat(val)), {
      message: 'El precio debe ser un número válido',
    })
    .transform((val) => parseFloat(val)), // Transforma el string a número
});

// Esquema para dirección
const addressSchema = z.object({
  street: z.string().min(1, 'La calle es obligatoria'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
});

// Esquema para cliente
const customerSchema = z.object({
  name: z.string().min(1, 'El nombre del cliente es obligatorio'),
  phone: z.string().min(1, 'El teléfono del cliente es obligatorio'),
  address: addressSchema,
});

// Esquema para detalles del pago
const paymentDetailsSchema = z.object({
  method: z.nativeEnum(PaymentMethod, {
    errorMap: () => ({ message: 'El método de pago seleccionado no es válido' }),
  }),
});

// Esquema principal para crear órdenes
export const createOrderSchema = z.object({
  customer: customerSchema,
  items: z.array(itemSchema).min(1, 'Debe haber al menos un ítem en la orden'),
  paymentDetails: paymentDetailsSchema,
  orderStatus: z
    .nativeEnum(OrderStatus, {
      errorMap: () => ({ message: 'El estado de la orden no es válido' }),
    })
    .default(OrderStatus.PENDIENTE),
  notes: z.string().optional().default('Sin notas'),
});

// Valores por defecto para crear una orden
export const defaultCreateOrderValues: CreateOrderType = {
  customer: {
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
    },
  },
  items: [
    {
      category: '',
      subcategory: '',
      quantity: 1,
      price: 0,
    },
  ],
  paymentDetails: {
    method: PaymentMethod.TRANSFERENCIA,
  },
  orderStatus: OrderStatus.PENDIENTE,
  notes: '',
};

// Tipo inferido para la orden
export type CreateOrderType = z.infer<typeof createOrderSchema>;
