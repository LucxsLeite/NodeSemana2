import { PrismaComentsRepository } from '@/repositories/prisma/coments-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreateComentUseCase } from '../coments/create-coment.js'

export function makeCreateComentUseCase() {
  const userRepository = new PrismaUsersRepository()
  const postRepository = new PrismaPostsRepository()
  const comentRepository = new PrismaComentsRepository()
  const createComentUseCase = new CreateComentUseCase(
    comentRepository,
    userRepository,
    postRepository,
  )

  return createComentUseCase
}
