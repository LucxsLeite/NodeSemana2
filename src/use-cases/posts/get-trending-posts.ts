import type { PostsRepository } from '@/repositories/posts-repository.js'

interface GetTrendingPostsUseCaseResponse {
  posts: any[]
}

export class GetTrendingPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<GetTrendingPostsUseCaseResponse> {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const posts = await this.postsRepository.getTrendingPosts(since)

    return { posts }
  }
}