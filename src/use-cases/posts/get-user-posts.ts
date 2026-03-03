import type { PostsRepository } from "@/repositories/posts-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import type { UsersRepository } from "@/repositories/users-repository.js"

interface GetUserPostsUseCaseRequest {
  usuarioPublicId: string
}

export class GetUserPostsUseCase {
  constructor(private postsRepository: PostsRepository, private usersRepository: UsersRepository) {}

  async execute({
    usuarioPublicId,
  }: GetUserPostsUseCaseRequest) {
    const user = await this.usersRepository.getUser({
      publicId: usuarioPublicId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }
    const posts = await this.postsRepository.findPostsByUser(user.id)
    
    return posts
  }
}