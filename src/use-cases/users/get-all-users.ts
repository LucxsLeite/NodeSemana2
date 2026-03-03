import type { UsersRepository } from "@/repositories/users-repository.js"
import type { Usuario } from "@/@types/prisma/client.js"

type GetAllUsersUseCaseResponse = {
  users: Usuario[]
}

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.usersRepository.listUsers()

    return { users }
  }
}