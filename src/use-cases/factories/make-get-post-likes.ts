import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetPostLikesUseCase } from '../likes/get-post-likes.js'

export function makeGetPostLikesUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const likesRepository = new PrismaLikesRepository()
  const useCase = new GetPostLikesUseCase(likesRepository, postsRepository)

  return useCase
}
