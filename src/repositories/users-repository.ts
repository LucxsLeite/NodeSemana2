import type { Prisma, Usuario } from '@/@types/prisma/client.js'

export interface UsersRepository {
  createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario>
  findByEmail(email: string): Promise<Usuario | null>
  getUser(where: Prisma.UsuarioWhereInput): Promise<Usuario | null>
  listUsers(): Promise<Usuario[]>
  deleteUser(id: number): Promise<void>
  updateUser(id: number, data: any): Promise<Usuario>
}
