import { hash } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateUserUseCaseRequest {
  publicId: string
  nome?: string
  email?: string
  senha?: string
  foto?: string | null
}

type UpdateUserUseCaseResponse = {
  user: Usuario
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    publicId,
    senha,
    nome,
    email,
    foto,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.usersRepository.getUser({ publicId })

    if (!userToUpdate) {
      throw new ResourceNotFoundError()
    }

    let _senhaHash: string | undefined

    if (senha) {
      _senhaHash = await hash(senha, env.HASH_SALT_ROUNDS)
    }

    const updatedUser = await this.usersRepository.updateUser(userToUpdate.id, {
      nome,
      email,
      foto,
      senha,
    })

    return { user: updatedUser }
  }
}
