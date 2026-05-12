import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  type: z.string(),
  balance: z.number(),
});

export const CustomerSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
});

export type Account = z.infer<typeof AccountSchema>;
export type Customer = z.infer<typeof CustomerSchema>;