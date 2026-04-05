import type { ComentsRepository } from '@/repositories/coments-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface CreateLikeUseCaseRequest {
  usuarioPublicId: string
  postPublicId?: string
  comentPublicId?: string
}

export class CreateLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
    private comentsRepository: ComentsRepository,
  ) {}

  async execute({
    usuarioPublicId,
    postPublicId,
    comentPublicId,
  }: CreateLikeUseCaseRequest) {
    if (!!postPublicId === !!comentPublicId) {
      throw new Error('Like deve ser em post OU comentário.')
    }

    const user = await this.usersRepository.getUser({
      publicId: usuarioPublicId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    let postId: number | undefined
    let comentId: number | undefined

    if (postPublicId) {
      const post = await this.postsRepository.getPost({
        publicId: postPublicId,
      })
      if (!post) throw new ResourceNotFoundError()
      postId = post.id
    }

    if (comentPublicId) {
      const coment = await this.comentsRepository.getComent({
        publicId: comentPublicId,
      })
      if (!coment) throw new ResourceNotFoundError()
      comentId = coment.id
    }

    const like = await this.likesRepository.createLike({
      usuario: { connect: { id: user.id } },
      post: postId ? { connect: { id: postId } } : undefined,
      coment: comentId ? { connect: { id: comentId } } : undefined,
    })

    return { like }
  }
}
