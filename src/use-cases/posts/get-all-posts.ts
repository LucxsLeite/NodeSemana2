import type { PostsRepository } from '@/repositories/posts-repository.js'

export class GetAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute() {
    const posts = await this.postsRepository.listPosts()

    return { posts }
  }
}
