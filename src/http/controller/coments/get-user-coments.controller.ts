import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetUserComentsUseCase } from "@/use-cases/factories/make-get-user-coments.js"
import { ComentPresenter } from "@/http/presenters/coment-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getUserComents(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      usuarioPublicId: z.string().uuid()
    })

    const { usuarioPublicId } = paramsSchema.parse(request.params)

    const getUserComentsUseCase = makeGetUserComentsUseCase()

    const coments = await getUserComentsUseCase.execute({
      usuarioPublicId
    })

    return reply.status(200).send((ComentPresenter.toHTTP(coments)))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}