import { randomBytes } from 'node:crypto'
import type { Usuario } from '@/@types/prisma/client.js'
import { emailSchema } from '@/http/schemas/utils/email.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface RecoverPasswordUseCaseRequest {
  login: string
}

type RecoverPasswordUseCaseResponse = {
  user: Usuario
  token: string
}

const EXPIRES_IN_MINUTES = 15
const TOKEN_LENGTH = 32

export class RecoverPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    login,
  }: RecoverPasswordUseCaseRequest): Promise<RecoverPasswordUseCaseResponse> {
    let userExists: Usuario | null = null

    if (emailSchema.safeParse(login).success) {
      userExists = await this.usersRepository.findByEmail(login)
    } else {
      userExists = await this.usersRepository.findByEmail(login)
    }

    const passwordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const tokenExpiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000)

    const tokenData = {
      token: passwordToken,
      tokenExpiresAt,
    }

    if (!userExists) throw new ResourceNotFoundError()

    const user = await this.usersRepository.updateUser(userExists.id, {
      ...tokenData,
    })

    return {
      user,
      token: passwordToken,
    }
  }
}
