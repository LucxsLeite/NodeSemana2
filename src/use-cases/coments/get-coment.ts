import type {
  ComentsRepository,
  ComentWithAll,
} from '@/repositories/coments-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetComentUseCaseRequest {
  publicId: string
}

type GetComentUseCaseResponse = {
  coment: ComentWithAll
}

export class GetComentUseCase {
  constructor(private comentsRepository: ComentsRepository) {}
  async execute({
    publicId,
  }: GetComentUseCaseRequest): Promise<GetComentUseCaseResponse> {
    const coment = await this.comentsRepository.getComent({ publicId })

    if (!coment) {
      throw new ResourceNotFoundError()
    }

    return { coment }
  }
}
