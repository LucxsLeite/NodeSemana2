import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma/prisma.js'
import type { ComentsRepository, ComentWithAll } from '../coments-repository.js'

export class PrismaComentsRepository implements ComentsRepository {
  async createComent(data: Prisma.ComentUncheckedCreateInput) {
    return await prisma.coment.create({
      data,
      include: { usuario: true, post: true, likes: true },
    })
  }
  async getComent(where: Prisma.ComentWhereInput) {
    return await prisma.coment.findFirst({
      where,
      include: { usuario: true, post: true, likes: true },
    })
  }
  async listComents() {
    return await prisma.coment.findMany({
      include: { usuario: true, post: true, likes: true },
      orderBy: { createdAt: 'desc' },
    })
  }
  async deleteComent(id: number) {
    await prisma.coment.delete({
      where: { id },
    })
  }
  async updateComent(
    id: number,
    data: Prisma.ComentUpdateInput,
  ): Promise<ComentWithAll> {
    return await prisma.coment.update({
      where: { id },
      data,
      include: { usuario: true, post: true, likes: true },
    })
  }
  async findComentsByUser(usuarioId: number): Promise<ComentWithAll[]> {
    return await prisma.coment.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
      include: { usuario: true, post: true, likes: true },
    })
  }
  async findComentsByPost(postId: number): Promise<ComentWithAll[]> {
    return await prisma.coment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: { usuario: true, post: true, likes: true },
    })
  }
}
