import type { FastifyInstance } from 'fastify'
import { userRoutes } from './users/user.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
}
