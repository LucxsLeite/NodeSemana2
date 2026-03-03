import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import type { PostsRepository, PostWithUser } from "@/repositories/posts-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"

interface CreatePostUseCaseRequest {
    titulo: string
    conteudo: string
    usuarioPublicId: string
}
type CreatePostUseCaseResponse = {
  post: PostWithUser
}
export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository, private usersRepository: UsersRepository) {}
  async execute({
    titulo,
    conteudo,
    usuarioPublicId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {

    const user = await this.usersRepository.getUser({publicId: usuarioPublicId})

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const post = await this.postsRepository.createPost({
      titulo,
      conteudo,
      usuarioId: user.id,
    })

    return { post }
  }
}