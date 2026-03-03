import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string(),
        })

        const {publicId} = getParamsSchema.parse(request.params)

        const getUserUseCase = makeGetUserUseCase()
        const { user } = await getUserUseCase.execute({
            publicId,
        })
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}