import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreatePostUseCase } from '../posts/posts.js'

export function makeCreatePostUseCase() {
  const userRepository = new PrismaUsersRepository()
  const postRepository = new PrismaPostsRepository()
  const createPostUseCase = new CreatePostUseCase(
    postRepository,
    userRepository,
  )

  return createPostUseCase
}
