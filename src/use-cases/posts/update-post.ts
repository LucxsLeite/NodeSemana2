import type { PostsRepository } from '@/repositories/posts-repository.js'

interface UpdatePostUseCaseRequest {
  postId: number
  titulo?: string
  conteudo?: string
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ postId, titulo, conteudo }: UpdatePostUseCaseRequest) {
    const postExists = await this.postsRepository.getPost({ id: postId })

    if (!postExists) {
      throw new Error('Post não encontrado')
    }

    const data: any = {}

    if (titulo !== undefined) data.titulo = titulo
    if (conteudo !== undefined) data.conteudo = conteudo

    const post = await this.postsRepository.updatePost(postId, data)

    return { post }
  }
}
