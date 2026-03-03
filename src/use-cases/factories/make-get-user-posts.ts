import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js"
import { GetUserPostsUseCase } from "../posts/get-user-posts.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"

export function makeGetUserPostsUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()
  const useCase = new GetUserPostsUseCase(postsRepository, usersRepository)

  return useCase
}