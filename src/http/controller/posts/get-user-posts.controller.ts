import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetUserPostsUseCase } from "@/use-cases/factories/make-get-user-posts.js"
import { PostPresenter } from "@/http/presenters/post-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getUserPosts(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      usuarioPublicId: z.string().uuid()
    })

    const { usuarioPublicId } = paramsSchema.parse(request.params)

    const getUserPostsUseCase = makeGetUserPostsUseCase()

    const posts = await getUserPostsUseCase.execute({
      usuarioPublicId
    })

    return reply.status(200).send((PostPresenter.toHTTP(posts)))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}