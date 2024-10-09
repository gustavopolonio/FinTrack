import { FastifyRequest } from "fastify";

import { CreateTransactionDTO } from "../schemas/transactionSchemas";
import { User } from "../models/userModel";
import { Transaction } from "../models/transactionModel";

export const transactionController = {
  createTransaction: async (request: FastifyRequest<{ Body: CreateTransactionDTO }>) => {
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
        userId,
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
}