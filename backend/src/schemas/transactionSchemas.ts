import { Types } from "mongoose";
import { z } from "zod";

export const createTransactionSchema = z.object({
  userId: z.string().refine(value => Types.ObjectId.isValid(value), {
    message: 'Invalid userId'
  }),
  description: z.string().min(3),
  type: z.enum(['income', 'outcome'] as const),
  category: z.string(),
  value: z.number()
})

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>