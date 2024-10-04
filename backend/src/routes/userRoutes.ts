import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { Types } from "mongoose";

import { User } from "../models/userModel";
import { Transaction } from "../models/transactionModel";

export async function userRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.string().email()
        })
      }
    },
    async (request) => {
      const { name, email } = request.body

      try {
        const user = await User.create({
          name,
          email
        })

        return {
          userId: user._id
        }
      } catch (err: any) {
        console.log(`Error creating new user: ${err}`)
        throw new Error(err)
      }
    }
  )

  server.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/transactions',
    {
      schema: {
        params: z.object({
          userId: z.string().refine(value => Types.ObjectId.isValid(value), {
            message: 'Invalid userId'
          }),
        })
      }
    },
    async (request) => {
      const { userId } = request.params

      const user = await User.findById(userId)

      if (!user) {
        throw new Error('User not found!')
      }

      try {
        const transactions = await Transaction.find({
          userId
        })

        return { transactions }
      } catch (err: any) {
        console.log(`Error retrieving transactions of user: ${err}`)
        throw new Error(err)
      }
    }
  )
}