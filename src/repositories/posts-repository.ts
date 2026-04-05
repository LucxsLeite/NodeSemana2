import type {
  Coment,
  Like,
  Post,
  Prisma,
  Usuario,
} from '@/@types/prisma/client.js'

export type PostWithUser = Post & {
  usuario: Usuario
  coments: Coment[]
  likes: Like[]
}

export interface PostsRepository {
  createPost(data: Prisma.PostUncheckedCreateInput): Promise<PostWithUser>
  getPost(where: Prisma.PostWhereInput): Promise<PostWithUser | null>
  listPosts(): Promise<PostWithUser[]>
  deletePost(id: number): Promise<void>
  updatePost(id: number, data: Prisma.PostUpdateInput): Promise<PostWithUser>
  findPostsByUser(usuarioId: number): Promise<PostWithUser[]>
}
