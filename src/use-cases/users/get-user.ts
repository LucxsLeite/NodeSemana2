import type { Usuario } from '@prisma/client'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetUserUseCaseRequest {
  publicId: string
}

type GetUserUseCaseResponse = {
  user: Usuario
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    publicId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.getUser({ publicId })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
