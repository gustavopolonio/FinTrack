import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createTransactionSchema } from "../schemas/transactionSchemas";
import { transactionController } from "../controllers/transactionController";

export async function transactionRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post(
    '/transactions',
    { schema: { body: createTransactionSchema } },
    transactionController.createTransaction
  )
}