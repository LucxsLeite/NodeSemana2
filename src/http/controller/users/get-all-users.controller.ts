import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { makeGetAllUsersUseCase } from '@/use-cases/factories/make-get-all-users.js'

export async function getAllUsers(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllUsersUseCase = makeGetAllUsersUseCase()

    const { users } = await getAllUsersUseCase.execute()

    return reply.status(201).send(UserPresenter.toHTTP(users))
  } catch (error) {
    throw error
  }
}
