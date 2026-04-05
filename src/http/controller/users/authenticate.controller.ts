import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate.js'
import { UserPresenter } from '../../presenters/user-presenter.js'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      email: z.email().trim().min(1),
      senha: z.string().min(8).max(16),
    })

    const { email, senha } = registerBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      login: email,
      password: senha,
    })

    const token = await reply.jwtSign(
      {
        sub: user.publicId,
      },
      { expiresIn: '1d' },
    )

    return reply.status(201).send({ token, user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
