import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ComentPresenter } from "@/http/presenters/coment-presenter.js"
import { makeUpdateComentUseCase } from "@/use-cases/factories/make-update-coment.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function updateComent(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    })

    const bodySchema = z.object({
      conteudo: z.string().trim().min(1)
    })

    const { id } = paramsSchema.parse(request.params)
    const { conteudo } = bodySchema.parse(request.body)

    const UpdateComentUseCase = makeUpdateComentUseCase()

    const data: any = { postId: id }

    if (conteudo !== undefined) data.conteudo = conteudo

    const { coment } = await UpdateComentUseCase.execute(data)

    return reply.status(200).send(ComentPresenter.toHTTP(coment))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message})
    }
    throw error
  }
}