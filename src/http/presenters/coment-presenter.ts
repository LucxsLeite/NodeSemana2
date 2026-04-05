import type { ComentWithAll } from '@/repositories/coments-repository.js'

type HTTPComent = {
  id: string
  conteudo: string
  createdAt: Date
  usuarioId: number
  postId: number
  usuario: {
    id: string
    nome: string
    foto: string | null
  }
  post: {
    id: string
    titulo: string
  }
  likesCount: number
}

export class ComentPresenter {
  static toHTTP(coment: ComentWithAll): HTTPComent
  static toHTTP(coments: ComentWithAll[]): HTTPComent[]
  static toHTTP(
    input: ComentWithAll | ComentWithAll[],
  ): HTTPComent | HTTPComent[] {
    if (Array.isArray(input)) {
      return input.map((coment) => ComentPresenter.toHTTP(coment))
    }

    return {
      id: input.publicId,
      conteudo: input.conteudo,
      createdAt: input.createdAt,
      usuarioId: input.usuarioId,
      postId: input.postId,
      usuario: {
        id: input.usuario.publicId,
        nome: input.usuario.nome,
        foto: input.usuario.foto,
      },
      post: {
        id: input.post.publicId,
        titulo: input.post.titulo,
      },
      likesCount: input.likes.length,
    }
  }
}
