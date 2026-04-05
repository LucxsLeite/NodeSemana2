import type { ComentsRepository } from '@/repositories/coments-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetPostComentsUseCaseRequest {
  postPublicId: string
}

export class GetPostComentsUseCase {
  constructor(
    private comentsRepository: ComentsRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({ postPublicId }: GetPostComentsUseCaseRequest) {
    const post = await this.postsRepository.getPost({
      publicId: postPublicId,
    })
    if (!post) {
      throw new ResourceNotFoundError()
    }
    const coments = await this.comentsRepository.findComentsByUser(post.id)

    return coments
  }
}
