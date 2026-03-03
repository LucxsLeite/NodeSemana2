import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ComentPresenter } from '@/http/presenters/coment-presenter.js'
import { makeGetComentUseCase } from '@/use-cases/factories/make-get-coment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function getComent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string().uuid(),
        })

        const {publicId} = getParamsSchema.parse(request.params)

        const getComentUseCase = makeGetComentUseCase()
        const { coment } = await getComentUseCase.execute({
            publicId,
        })
        return reply.status(200).send(ComentPresenter.toHTTP(coment))
    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}