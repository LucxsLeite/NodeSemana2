import type { LikesRepository } from "@/repositories/likes-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"

interface GetPostLikesUseCaseRequest {
  postPublicId: string
}

export class GetPostLikesUseCase {
  constructor(private likesRepository: LikesRepository, private postsRepository: PostsRepository) {}

  async execute({
    postPublicId,
  }: GetPostLikesUseCaseRequest) {
    const post = await this.postsRepository.getPost({
        publicId: postPublicId
    })
    if (!post) {
        throw new ResourceNotFoundError()
    }
    const likes = await this.likesRepository.findLikesByUser(post.id)
    
    return likes
  }
}