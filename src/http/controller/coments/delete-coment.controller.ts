import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeDeleteComentUseCase } from "@/use-cases/factories/make-delete-coment.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function deleteComent(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const deleteComentUseCase = makeDeleteComentUseCase()

    await deleteComentUseCase.execute({ publicId: id })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message})
        }
        throw error
  }
}