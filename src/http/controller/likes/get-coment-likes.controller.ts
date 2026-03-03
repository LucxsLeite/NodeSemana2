import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetComentLikesUseCase } from "@/use-cases/factories/make-get-coment-likes.js"
import { LikePresenter } from "@/http/presenters/like-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getComentLikes(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      comentPublicId: z.string().uuid()
    })

    const { comentPublicId } = paramsSchema.parse(request.params)

    const getComentLikesUseCase = makeGetComentLikesUseCase()

    const likes = await getComentLikesUseCase.execute({
      comentPublicId
    })

    return reply.status(200).send((LikePresenter.toHTTP(likes)))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}