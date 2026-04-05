import type { PostWithUser } from '@/repositories/posts-repository.js'

type HTTPPost = {
  id: string
  titulo: string
  conteudo: string
  createdAt: Date
  usuarioId: number
  usuario: {
    id: string
    nome: string
    foto: string | null
  }
  comentsCount: number
  likesCount: number
}

export class PostPresenter {
  static toHTTP(post: PostWithUser): HTTPPost
  static toHTTP(posts: PostWithUser[]): HTTPPost[]
  static toHTTP(input: PostWithUser | PostWithUser[]): HTTPPost | HTTPPost[] {
    if (Array.isArray(input)) {
      return input.map((post) => PostPresenter.toHTTP(post))
    }

    return {
      id: input.publicId,
      titulo: input.titulo,
      conteudo: input.conteudo,
      createdAt: input.createdAt,
      usuarioId: input.usuarioId,
      usuario: {
        id: input.usuario.publicId,
        nome: input.usuario.nome,
        foto: input.usuario.foto,
      },
      comentsCount: input.coments.length,
      likesCount: input.likes.length,
    }
  }
}
