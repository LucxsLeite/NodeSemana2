import type { ComentsRepository } from '@/repositories/coments-repository.js'

interface DeleteComentUseCaseRequest {
  publicId: string
}

export class DeleteComentUseCase {
  constructor(private comentsRepository: ComentsRepository) {}

  async execute({ publicId }: DeleteComentUseCaseRequest) {
    const comentToDelete = await this.comentsRepository.getComent({ publicId })

    if (!comentToDelete) {
      throw new Error('Post not found.')
    }
    const post = await this.comentsRepository.deleteComent(comentToDelete.id)
    return post
  }
}
