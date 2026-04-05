import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ItemAlreadyExistsError } from '@/use-cases/errors/item-already-exists-error.js'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case.js'
import { UserPresenter } from '../../presenters/user-presenter.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      nome: z.string().trim().min(1).max(32),
      email: z.email().trim(),
      senha: z.string().min(8).max(16),
      foto: z.string().min(1).nullable(),
    })

    const { nome, email, senha, foto } = registerBodySchema.parse(request.body)

    const registerUserUseCase = makeRegisterUseCase()

    const { user } = await registerUserUseCase.execute({
      nome,
      email,
      senha,
      foto,
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ItemAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
