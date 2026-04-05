import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PostPresenter } from '@/http/presenters/post-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetPostUseCase } from '@/use-cases/factories/make-get-post.js'

export async function getPost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string().uuid(),
    })

    const { publicId } = getParamsSchema.parse(request.params)

    const getPostUseCase = makeGetPostUseCase()
    const { post } = await getPostUseCase.execute({
      publicId,
    })
    return reply.status(200).send(PostPresenter.toHTTP(post))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
