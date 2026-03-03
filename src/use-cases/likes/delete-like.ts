import type { LikesRepository } from "@/repositories/likes-repository.js"

interface DeleteLikeUseCaseRequest {
  publicId: string
}

export class DeleteLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({ publicId }: DeleteLikeUseCaseRequest) {

    const like = await this.likesRepository.getLike({ publicId })

    if (!like) {
      throw new Error("Post not found.")
    }
    const post = await this.likesRepository.deleteLike(like.id)
    return (post)
  }
}