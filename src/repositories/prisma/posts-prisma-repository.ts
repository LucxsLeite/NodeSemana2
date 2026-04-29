import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/lib/prisma/prisma.js'
import type { PostsRepository, PostWithUser } from '../posts-repository.js'

export class PrismaPostsRepository implements PostsRepository {
  async createPost(data: Prisma.PostUncheckedCreateInput) {
    return await prisma.post.create({
      data,
      include: { usuario: true, coments: true, likes: true },
    })
  }
  async getPost(where: Prisma.PostWhereInput) {
    return await prisma.post.findFirst({
      where,
      include: { usuario: true, coments: true, likes: true },
    })
  }
  async listPosts() {
    return await prisma.post.findMany({
      include: { usuario: true, coments: true, likes: true },
      orderBy: { createdAt: 'desc' },
    })
  }
  async deletePost(id: number) {
    await prisma.post.delete({
      where: { id },
    })
  }
  async updatePost(
    id: number,
    data: Prisma.PostUpdateInput,
  ): Promise<PostWithUser> {
    return await prisma.post.update({
      where: { id },
      data,
      include: { usuario: true, coments: true, likes: true },
    })
  }
  async findPostsByUser(usuarioId: number): Promise<PostWithUser[]> {
    return await prisma.post.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
      include: { usuario: true, coments: true, likes: true },
    })
  }
  async getTrendingPosts(since: Date): Promise<PostWithUser[]> {
    const topPosts = await prisma.like.groupBy({
      by: ['postId'],
      where: {
        createdAt: {
          gte: since,
        },
      },
      _count: {
        postId: true,
      },
      orderBy: {
        _count: {
          postId: 'desc',
        },
      },
      take: 3,
    })

    if (topPosts.length === 0) return []

    const postIds = topPosts
      .map((p: (typeof topPosts)[number]) => p.postId)
      .filter((id): id is number => id !== null)

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postIds,
        },
      },
      include: {
        usuario: true,
        coments: true,
        likes: true,
      },
    })

    const sortedPosts = topPosts
      .map((tp: (typeof topPosts)[number]) =>
        posts.find((p: PostWithUser) => p.id === tp.postId),
      )
      .filter((p): p is PostWithUser => Boolean(p))

    return sortedPosts
  }
}
