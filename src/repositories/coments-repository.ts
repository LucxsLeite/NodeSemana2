import type {
  Coment,
  Like,
  Post,
  Prisma,
  Usuario,
} from '@prisma/client'

export type ComentWithAll = Coment & {
  usuario: Usuario
  post: Post
  likes: Like[]
}

export interface ComentsRepository {
  createComent(data: Prisma.ComentUncheckedCreateInput): Promise<ComentWithAll>
  getComent(where: Prisma.ComentWhereInput): Promise<ComentWithAll | null>
  listComents(): Promise<ComentWithAll[]>
  deleteComent(id: number): Promise<void>
  updateComent(
    id: number,
    data: Prisma.ComentUpdateInput,
  ): Promise<ComentWithAll>
  findComentsByUser(usuarioId: number): Promise<ComentWithAll[]>
  findComentsByPost(postId: number): Promise<ComentWithAll[]>
}
