import type {
  PostsRepository,
  PostWithUser,
} from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetPostUseCaseRequest {
  publicId: string
}

type GetPostUseCaseResponse = {
  post: PostWithUser
}

export class GetPostUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute({
    publicId,
  }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
    const post = await this.postsRepository.getPost({ publicId })

    if (!post) {
      throw new ResourceNotFoundError()
    }

    return { post }
  }
}
