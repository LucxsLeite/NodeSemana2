import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetPostUseCase } from '../posts/get-post.js'

export function makeGetPostUseCase() {
  const postRepository = new PrismaPostsRepository()
  const getPostUseCase = new GetPostUseCase(postRepository)

  return getPostUseCase
}
