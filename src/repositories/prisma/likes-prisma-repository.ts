import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma/prisma.js'
import type { LikesRepository, LikeWithAll } from '../likes-repository.js'

export class PrismaLikesRepository implements LikesRepository {
  async createLike(data: Prisma.LikeCreateInput) {
    return await prisma.like.create({
      data,
      include: { usuario: true, post: true, coment: true },
    })
  }
  async getLike(where: Prisma.LikeWhereInput) {
    return await prisma.like.findFirst({
      where,
      include: { usuario: true, post: true, coment: true },
    })
  }
  async deleteLike(id: number) {
    await prisma.like.delete({
      where: { id },
    })
  }
  async findLikesByUser(usuarioId: number): Promise<LikeWithAll[]> {
    return await prisma.like.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
      include: { usuario: true, post: true, coment: true },
    })
  }
  async findLikesByPost(postId: number): Promise<LikeWithAll[]> {
    return await prisma.like.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: { usuario: true, post: true, coment: true },
    })
  }
  async findLikesByComent(comentId: number): Promise<LikeWithAll[]> {
    return await prisma.like.findMany({
      where: { comentId },
      orderBy: { createdAt: 'desc' },
      include: { usuario: true, post: true, coment: true },
    })
  }
}
