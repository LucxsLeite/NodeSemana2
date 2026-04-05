import type { Usuario } from '@/@types/prisma/client.js'

type HTTPUser = {
  id: string
  nome: string
  email: string
  foto: string | null
}

export class UserPresenter {
  static toHTTP(user: Usuario): HTTPUser
  static toHTTP(users: Usuario[]): HTTPUser[]
  static toHTTP(input: Usuario | Usuario[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((user) => UserPresenter.toHTTP(user))
    }
    return {
      id: input.publicId,
      nome: input.nome,
      email: input.email,
      foto: input.foto,
    }
  }
}
