import { PrismaComentsRepository } from '@/repositories/prisma/coments-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetPostComentsUseCase } from '../coments/get-post-coments.js'

export function makeGetPostComentsUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const comentsRepository = new PrismaComentsRepository()
  const useCase = new GetPostComentsUseCase(comentsRepository, postsRepository)

  return useCase
}
