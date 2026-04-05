import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeUpdateUseCase } from '@/use-cases/factories/make-update-user.js'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      publicId: z.string(),
    })
    const { publicId } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
      nome: z.string().trim().min(1).max(32).optional(),
      email: z.string().email().optional(),
      senha: z.string().min(8).max(16).optional(),
      foto: z.string().min(1).nullable().optional(),
    })
    const { nome, email, senha, foto } = bodySchema.parse(request.body)
    const UpdateUserUseCase = makeUpdateUseCase()
    const { user } = await UpdateUserUseCase.execute({
      publicId,
      nome,
      email,
      senha,
      foto,
    })
    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
