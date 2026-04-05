import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { authenticate } from './authenticate.controller.js'
import { deleteUser } from './delete-user.controller.js'
import { getAllUsers } from './get-all-users.controller.js'
import { getUser } from './get-user.controller.js'
import { register } from './register.controller.js'
import { updateUser } from './update-user.controller.js'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/authenticate', authenticate)
  app.get('/:publicId', getUser)
  app.get('/', getAllUsers)
  app.delete('/:publicId', { onRequest: [verifyJwt] }, deleteUser)
  app.patch('/:publicId', { onRequest: [verifyJwt] }, updateUser)
}
