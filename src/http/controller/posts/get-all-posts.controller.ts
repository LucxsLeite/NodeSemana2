import type { FastifyReply, FastifyRequest } from 'fastify'
import { PostPresenter } from '@/http/presenters/post-presenter.js'
import { makeGetAllPostsUseCase } from '@/use-cases/factories/make-get-all-posts.js'

export async function getAllPosts(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllPostsUseCase = makeGetAllPostsUseCase()

    const { posts } = await getAllPostsUseCase.execute()

    return reply.status(200).send(PostPresenter.toHTTP(posts))
  } catch (error) {
    throw error
  }
}
