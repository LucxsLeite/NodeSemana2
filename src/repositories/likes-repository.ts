import type {
  Coment,
  Like,
  Post,
  Prisma,
  Usuario,
} from '@/@types/prisma/client.js'

export type LikeWithAll = Like & {
  usuario: Usuario
  post?: Post | null
  coment?: Coment | null
}

export interface LikesRepository {
  createLike(data: Prisma.LikeCreateInput): Promise<LikeWithAll>
  getLike(where: Prisma.LikeWhereInput): Promise<LikeWithAll | null>
  deleteLike(id: number): Promise<void>
  findLikesByUser(usuarioId: number): Promise<LikeWithAll[]>
  findLikesByPost(postId: number): Promise<LikeWithAll[]>
  findLikesByComent(comentId: number): Promise<LikeWithAll[]>
}
