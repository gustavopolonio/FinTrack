import fastify from 'fastify'
import { connectWithMongo } from './plugins/mongo'

const port = Number(process.env.PORT) || 3333

async function startServer() {
  try {
    const server = fastify()
    await connectWithMongo()
    await server.listen({ port })
    console.log(`Server running on port: ${port}`)
  } catch (err) {
    console.log(err)
  }
}
startServer()