import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetUserLikesUseCase } from "@/use-cases/factories/make-get-user-likes.js"
import { LikePresenter } from "@/http/presenters/like-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getUserLikes(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      usuarioPublicId: z.string().uuid()
    })

    const { usuarioPublicId } = paramsSchema.parse(request.params)

    const getUserLikesUseCase = makeGetUserLikesUseCase()

    const likes = await getUserLikesUseCase.execute({
      usuarioPublicId
    })

    return reply.status(200).send((LikePresenter.toHTTP(likes)))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}