import type {
  ComentsRepository,
  ComentWithAll,
} from '@/repositories/coments-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface CreateComentUseCaseRequest {
  conteudo: string
  usuarioPublicId: string
  postPublicId: string
}
type CreateComentUseCaseResponse = {
  coment: ComentWithAll
}
export class CreateComentUseCase {
  constructor(
    private comentsRepository: ComentsRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}
  async execute({
    conteudo,
    usuarioPublicId,
    postPublicId,
  }: CreateComentUseCaseRequest): Promise<CreateComentUseCaseResponse> {
    const user = await this.usersRepository.getUser({
      publicId: usuarioPublicId,
    })
    const post = await this.postsRepository.getPost({ publicId: postPublicId })

    if (!user || !post) {
      throw new ResourceNotFoundError()
    }

    const coment = await this.comentsRepository.createComent({
      conteudo,
      usuarioId: user.id,
      postId: post.id,
    })

    return { coment }
  }
}
