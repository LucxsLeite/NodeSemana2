import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { GetLikeUseCase } from '../likes/get-like.js'

export function makeGetLikeUseCase() {
  const likeRepository = new PrismaLikesRepository()
  const getLikeUseCase = new GetLikeUseCase(likeRepository)

  return getLikeUseCase
}
