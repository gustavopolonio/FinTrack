import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import cors from '@fastify/cors'

import { connectWithMongo } from './plugins/mongo'
import { transactionRoutes } from './routes/transactionRoutes'
import { userRoutes } from './routes/userRoutes';

const server = fastify()

server.register(cors, {
  origin: true
})

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(transactionRoutes)
server.register(userRoutes)

const port = Number(process.env.PORT) || 3333

async function startServer() {
  try {
    await connectWithMongo()
    await server.listen({ port })
    console.log(`Server running on port: ${port}`)
  } catch (err) {
    console.log(err)
  }
}
startServer()