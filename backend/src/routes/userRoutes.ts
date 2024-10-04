import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { userController } from "../controllers/userController";
import { createUserSchema, getUserTransactionsSchema } from "../schemas/userSchemas";

export async function userRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    { schema: { body: createUserSchema } },
    userController.createUser
  )

  server.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/transactions',
    { schema: { params: getUserTransactionsSchema } },
    userController.getUserTransactions
  )
}