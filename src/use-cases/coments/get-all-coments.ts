import type { ComentsRepository } from '@/repositories/coments-repository.js'

export class GetAllComentsUseCase {
  constructor(private comentsRepository: ComentsRepository) {}

  async execute() {
    const coments = await this.comentsRepository.listComents()

    return { coments }
  }
}
