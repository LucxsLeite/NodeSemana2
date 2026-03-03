import type { ComentsRepository } from "@/repositories/coments-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import type { UsersRepository } from "@/repositories/users-repository.js"

interface GetUserComentsUseCaseRequest {
  usuarioPublicId: string
}

export class GetUserComentsUseCase {
  constructor(private comentsRepository: ComentsRepository, private usersRepository: UsersRepository) {}

  async execute({
    usuarioPublicId,
  }: GetUserComentsUseCaseRequest) {
    const user = await this.usersRepository.getUser({
        publicId: usuarioPublicId
    })
    if (!user) {
        throw new ResourceNotFoundError()
    }
    const coments = await this.comentsRepository.findComentsByUser(user.id)
    
    return coments
  }
}