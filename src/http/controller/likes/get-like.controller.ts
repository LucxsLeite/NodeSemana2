import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenters/like-presenter.js'
import { makeGetLikeUseCase } from '@/use-cases/factories/make-get-like.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function getLike(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string().uuid(),
        })

        const {publicId} = getParamsSchema.parse(request.params)

        const getLikeUseCase = makeGetLikeUseCase()
        const { like } = await getLikeUseCase.execute({
            publicId,
        })
        return reply.status(200).send(LikePresenter.toHTTP(like))
    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}