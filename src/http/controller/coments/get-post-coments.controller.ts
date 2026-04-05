import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ComentPresenter } from '@/http/presenters/coment-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetPostComentsUseCase } from '@/use-cases/factories/make-get-post-coments.js'

export async function getPostComents(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      postPublicId: z.string().uuid(),
    })

    const { postPublicId } = paramsSchema.parse(request.params)

    const getPostComentsUseCase = makeGetPostComentsUseCase()

    const coments = await getPostComentsUseCase.execute({
      postPublicId,
    })

    return reply.status(200).send(ComentPresenter.toHTTP(coments))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
