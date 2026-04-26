import type { ComentsRepository } from '@/repositories/coments-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetComentLikesUseCaseRequest {
  comentPublicId: string
}

export class GetComentLikesUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private comentsRepository: ComentsRepository,
  ) {}

  async execute({ comentPublicId }: GetComentLikesUseCaseRequest) {
    const coment = await this.comentsRepository.getComent({
      publicId: comentPublicId,
    })
    if (!coment) {
      throw new ResourceNotFoundError()
    }
    const likes = await this.likesRepository.findLikesByComent(coment.id)

    return likes
  }
}
