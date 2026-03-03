import type { LikeWithAll } from "@/repositories/likes-repository.js"

type HTTPLike = {
  id: string
  createdAt: Date
  usuarioId: number
  postId: number | null
  comentId: number | null
  usuario: {
    id: string
    nome: string
    foto: string | null
  }
}

export class LikePresenter {
  static toHTTP(like: LikeWithAll): HTTPLike
  static toHTTP(likes: LikeWithAll[]): HTTPLike[]
  static toHTTP(input: LikeWithAll | LikeWithAll[]): HTTPLike | HTTPLike[] {
    if (Array.isArray(input)) {
      return input.map((like) => this.toHTTP(like))
    }

    return {
      id: input.publicId,
      createdAt: input.createdAt,
      usuarioId: input.usuarioId,
      postId: input.postId ?? null,
      comentId: input.comentId ?? null,
      usuario: {
        id: input.usuario.publicId,
        nome: input.usuario.nome,
        foto: input.usuario.foto,
      }
    }
  }
}