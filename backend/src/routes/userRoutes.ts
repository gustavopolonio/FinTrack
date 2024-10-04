import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { User } from "../models/userModel";

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
}