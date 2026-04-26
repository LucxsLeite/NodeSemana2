import type { FastifyInstance } from 'fastify'
import { userRoutes } from './users/user.routes.js'
import { comentRoutes } from './coments/coments.routes.js'
import { likeRoutes } from './likes/likes-routes.js'
import { postRoutes } from './posts/post.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' }),
  app.register(postRoutes, { prefix: '/posts' }),
  app.register(comentRoutes, { prefix: '/coments' }),
  app.register(likeRoutes, { prefix: '/likes' })
}
