import type { LikesRepository } from "@/repositories/likes-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import type { UsersRepository } from "@/repositories/users-repository.js"

interface GetUserLikesUseCaseRequest {
  usuarioPublicId: string
}

export class GetUserLikesUseCase {
  constructor(private likesRepository: LikesRepository, private usersRepository: UsersRepository) {}

  async execute({
    usuarioPublicId,
  }: GetUserLikesUseCaseRequest) {
    const user = await this.usersRepository.getUser({
      publicId: usuarioPublicId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }
    const likes = await this.likesRepository.findLikesByUser(user.id)
    
    return likes
  }
}