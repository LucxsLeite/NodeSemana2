import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { PostsRepository, PostWithUser } from '../posts-repository.js'

export class PrismaPostsRepository implements PostsRepository {
    async createPost(data: Prisma.PostUncheckedCreateInput) {
        return await prisma.post.create({
            data,
            include: {usuario: true, coments: true, likes: true}
            })
    }
    async getPost(where: Prisma.PostWhereInput) {
        return await prisma.post.findFirst({
             where,
             include: {usuario: true, coments: true, likes: true}
            })
    }
    async listPosts() {
        return await prisma.post.findMany({
            include: {usuario: true, coments: true, likes: true},
            orderBy: { createdAt: "desc" }
        })
    }
    async deletePost(id: number) {
        await prisma.post.delete({
            where: { id }
        })
    }
    async updatePost(id: number, data: Prisma.PostUpdateInput): Promise<PostWithUser> {
        return await prisma.post.update({
            where: { id },
            data,
            include: {usuario: true, coments: true, likes: true}
        })
    }
    async findPostsByUser(usuarioId: number): Promise<PostWithUser[]>{
        return await prisma.post.findMany({
            where: {usuarioId},
            orderBy: {createdAt: "desc",},
            include: {usuario: true, coments: true, likes: true}
        })
    }
}