import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PostPresenter } from '@/http/presenters/post-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeUpdatePostUseCase } from '@/use-cases/factories/make-update-post.js'

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    })

    const bodySchema = z.object({
      titulo: z.string().trim().min(1).max(120).optional(),
      conteudo: z.string().trim().min(1).optional(),
    })

    const { id } = paramsSchema.parse(request.params)
    const { titulo, conteudo } = bodySchema.parse(request.body)

    const UpdatePostUseCase = makeUpdatePostUseCase()

    const data: any = { postId: id }

    if (titulo !== undefined) data.titulo = titulo
    if (conteudo !== undefined) data.conteudo = conteudo

    const { post } = await UpdatePostUseCase.execute(data)

    return reply.status(200).send(PostPresenter.toHTTP(post))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
