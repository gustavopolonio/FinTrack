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

  getUserTransactions: async (request: FastifyRequest<{ 
    Params: GetUserTransactionsDTO['params'],
    Querystring: GetUserTransactionsDTO['queryString']
  }>) => {
    const { userId } = request.params
    const { limit, lastCreatedAt } = request.query

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    let query: {
      userId: string,
      isDeleted: boolean,
      createdAt?: { $lt: Date }
    } = {
      userId,
      isDeleted: false,
    }

    if (lastCreatedAt) {
      query = {
        ...query,
        createdAt: { $lt: new Date(lastCreatedAt) }, // Search for transactions with createdAt less than lastCreatedAt
      };
    }

    const limiting = Number(limit) || 0

    try {
      const transactions = await Transaction.find(query)
        .sort({ createdAt: 'descending' })
        .limit(limiting)

      const totalTransactions = await Transaction.countDocuments(query)

      const nextCreatedAt = totalTransactions > transactions.length
        ? transactions[transactions.length - 1].createdAt
        : null

      return { 
        transactions,
        nextCreatedAt
      }
    } catch (err: any) {
      console.log(`Error retrieving transactions of user: ${err}`)
      throw new Error(err)
    }
  }
}