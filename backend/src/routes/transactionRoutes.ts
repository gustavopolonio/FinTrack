import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { Types } from "mongoose";

import { Transaction } from "../models/transactionModel";
import { User } from "../models/userModel";

export async function transactionRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post(
    '/transactions',
    {
      schema: {
        body: z.object({
          userId: z.string().refine(value => Types.ObjectId.isValid(value), {
            message: 'Invalid userId'
          }),
          description: z.string().min(3),
          type: z.enum(['income', 'outcome'] as const),
          category: z.string(),
          value: z.number()
        })
      }
    },
    async (request) => {
      const { 
        userId,
        description,
        type,
        category,
        value
      } = request.body

      try {
        const user = await User.findById(userId)

        if (!user) {
          throw new Error('User not found!')
        }

        const transaction = await Transaction.create({
          userId: new Types.ObjectId(userId),
          description,
          type,
          category,
          value
        })

        return {
          transactionId: transaction._id
        }
      } catch (err: any) {
        console.log(`Error creating new transaction: ${err}`)
        throw new Error(err)
      }
    }
  )
}