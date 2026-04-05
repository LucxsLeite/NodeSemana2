import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { LikePresenter } from '@/http/presenters/like-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetPostLikesUseCase } from '@/use-cases/factories/make-get-post-likes.js'

export async function getPostLikes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      postPublicId: z.string().uuid(),
    })

    const { postPublicId } = paramsSchema.parse(request.params)

    const getPostLikesUseCase = makeGetPostLikesUseCase()

    const likes = await getPostLikesUseCase.execute({
      postPublicId,
    })

    return reply.status(200).send(LikePresenter.toHTTP(likes))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
