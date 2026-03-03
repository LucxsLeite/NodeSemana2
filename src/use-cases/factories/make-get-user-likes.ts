import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository.js"
import { GetUserLikesUseCase } from "../likes/get-user-likes.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"

export function makeGetUserLikesUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const likesRepository = new PrismaLikesRepository()
  const useCase = new GetUserLikesUseCase(likesRepository, usersRepository)

  return useCase
}