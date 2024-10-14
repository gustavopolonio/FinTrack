import { FastifyRequest } from "fastify";

import { User } from "../models/userModel";
import { Transaction } from "../models/transactionModel";
import { CreateUserDTO, GetUserTransactionsDTO } from "../schemas/userSchemas";

export const userController = {
  createUser: async (request: FastifyRequest<{ Body: CreateUserDTO }>) => {
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
  },

  getUserTransactions: async (request: FastifyRequest<{ Params: GetUserTransactionsDTO }>) => {
    const { userId } = request.params

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    try {
      const transactions = await Transaction.find({
        userId,
        isDeleted: false,
      }).sort({ createdAt: 'descending' })

      return { transactions }
    } catch (err: any) {
      console.log(`Error retrieving transactions of user: ${err}`)
      throw new Error(err)
    }
  }
}