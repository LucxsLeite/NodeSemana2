import { PrismaComentsRepository } from '@/repositories/prisma/coments-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetUserComentsUseCase } from '../coments/get-user-coments.js'

export function makeGetUserComentsUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const comentsRepository = new PrismaComentsRepository()
  const useCase = new GetUserComentsUseCase(comentsRepository, usersRepository)

  return useCase
}
