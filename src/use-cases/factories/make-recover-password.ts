import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RecoverPasswordUseCase } from '../users/recover-password.js'

export function makeRecoverPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const recoverPasswordUseCase = new RecoverPasswordUseCase(usersRepository)

  return recoverPasswordUseCase
}
