import type {
  LikesRepository,
  LikeWithAll,
} from '@/repositories/likes-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetLikeUseCaseRequest {
  publicId: string
}

type GetLikeUseCaseResponse = {
  like: LikeWithAll
}

export class GetLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}
  async execute({
    publicId,
  }: GetLikeUseCaseRequest): Promise<GetLikeUseCaseResponse> {
    const like = await this.likesRepository.getLike({ publicId })

    if (!like) {
      throw new ResourceNotFoundError()
    }

    return { like }
  }
}
