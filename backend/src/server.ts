import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { connectWithMongo } from './plugins/mongo'
import { transactionRoutes } from './routes/transactionRoutes'

const server = fastify()

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(transactionRoutes)

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