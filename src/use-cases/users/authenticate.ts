import { compare } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

interface AuthenticateUseCaseRequest {
  login: string
  password: string
}
type AuthenticateUseCaseResponse = {
  user: Usuario
}
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    login,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(login)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const passwordMatches = await compare(password, user.senhaHash)
    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
