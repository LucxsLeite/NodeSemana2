import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { createComent } from './create-coment.controller.js'
import { deleteComent } from './delete-coment.controller.js'
import { getAllComents } from './get-all-coments.controller.js'
import { getComent } from './get-coment.controller.js'
import { getPostComents } from './get-post-coments.controller.js'
import { getUserComents } from './get-user-coments.controller.js'
import { updateComent } from './update-coment.controller.js'

export async function postRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, createComent)
  app.get('/:publicId', getComent)
  app.get('/user/:publicId', getUserComents)
  app.get('/post/:publicId', getPostComents)
  app.get('/', getAllComents)
  app.delete('/:publicId', { onRequest: [verifyJwt] }, deleteComent)
  app.patch('/:publicId', { onRequest: [verifyJwt] }, updateComent)
}
