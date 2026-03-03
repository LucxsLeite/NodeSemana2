import type { FastifyRequest, FastifyReply } from "fastify"
import { ComentPresenter } from "@/http/presenters/coment-presenter.js"
import { makeGetAllComentsUseCase } from "@/use-cases/factories/make-get-all-coments.js"

export async function getAllComents(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllComentsUseCase = makeGetAllComentsUseCase()

    const { coments } = await getAllComentsUseCase.execute()

    return reply.status(200).send(ComentPresenter.toHTTP(coments))
  } catch (error) {
    throw error
  }
}