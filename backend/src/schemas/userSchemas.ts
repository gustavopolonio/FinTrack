import { Types } from "mongoose";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email()
})

export type CreateUserDTO = z.infer<typeof createUserSchema>

export const getUserTransactionsSchema = z.object({
  userId: z.string().refine(value => Types.ObjectId.isValid(value), {
    message: 'Invalid userId'
  }),
})

export type GetUserTransactionsDTO = z.infer<typeof getUserTransactionsSchema>