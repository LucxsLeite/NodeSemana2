import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { UsersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements UsersRepository {
  async createUser(data: Prisma.UsuarioCreateInput) {
    return await prisma.usuario.create({ data })
  }
  async findByEmail(email: string) {
    return await prisma.usuario.findFirst({
      where: { email },
    })
  }
  async listUsers() {
    return await prisma.usuario.findMany({
      orderBy: { id: 'asc' },
    })
  }
  async getUser(where: Prisma.UsuarioWhereInput) {
    return await prisma.usuario.findFirst({ where })
  }
  async deleteUser(id: number) {
    await prisma.usuario.delete({
      where: { id },
    })
  }
  async updateUser(id: number, data: any) {
    return await prisma.usuario.update({
      where: { id },
      data,
    })
  }
}
