import { z } from 'zod';

// Esquema de validación para el formulario de actualización de usuario

export const UserUpdateSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
  company: z.string().optional(),
  sheetId: z.string().optional(),
  alias: z.string().optional(),
});

//Lo convertimos a un type
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
