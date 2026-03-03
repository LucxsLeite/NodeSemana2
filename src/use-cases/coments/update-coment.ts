import type { ComentsRepository } from "@/repositories/coments-repository.js"

interface UpdateComentUseCaseRequest {
  postId: number
  conteudo?: string
}

export class UpdateComentUseCase {
  constructor(private comentsRepository: ComentsRepository) {}

  async execute({ postId, conteudo }: UpdateComentUseCaseRequest) {
    const comentExists = await this.comentsRepository.getComent({ id: postId })

    if (!comentExists) {
      throw new Error("Comentário não encontrado")
    }

    const data: any = {}

    if (conteudo !== undefined) data.conteudo = conteudo

    const coment = await this.comentsRepository.updateComent(postId, data)

    return { coment }
  }
}