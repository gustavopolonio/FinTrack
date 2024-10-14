import { Types } from "mongoose";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email()
})

export type CreateUserDTO = z.infer<typeof createUserSchema>

export const getUserTransactionsParamsSchema = z.object({
  userId: z.string().refine(value => Types.ObjectId.isValid(value), {
    message: 'Invalid userId'
  }),
})

export const getUserTransactionsQuerySchema = z.object({
  limit: z.string().optional(),
  lastCreatedAt: z.string().optional()
})

type GetUserTransactionsParamsDTO = z.infer<typeof getUserTransactionsParamsSchema>
type GetUserTransactionsQueryDTO = z.infer<typeof getUserTransactionsQuerySchema>

export type GetUserTransactionsDTO = {
  params: GetUserTransactionsParamsDTO,
  queryString: GetUserTransactionsQueryDTO
}