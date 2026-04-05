import type { PostsRepository } from '@/repositories/posts-repository.js'

interface DeletePostUseCaseRequest {
  publicId: string
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ publicId }: DeletePostUseCaseRequest) {
    const postToDelete = await this.postsRepository.getPost({ publicId })

    if (!postToDelete) {
      throw new Error('Post not found.')
    }
    const post = await this.postsRepository.deletePost(postToDelete.id)
    return post
  }
}
