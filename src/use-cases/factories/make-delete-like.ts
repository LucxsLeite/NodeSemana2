import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { DeleteLikeUseCase } from '../likes/delete-like.js'

export function makeDeleteLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository)

  return deleteLikeUseCase
}
