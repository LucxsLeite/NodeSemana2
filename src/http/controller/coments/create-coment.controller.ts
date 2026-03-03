import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateComentUseCase } from "@/use-cases/factories/make-create-coment.js"
import { ComentPresenter } from "@/http/presenters/coment-presenter.js"


export async function createComent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createComentBodySchema = z.object({
            conteudo: z.string().trim().min(1),
            usuarioPublicId: z.string().uuid(),
            postPublicId: z.string().uuid()
        })
        const { conteudo, usuarioPublicId, postPublicId } = createComentBodySchema.parse(request.body)

        const createComentUseCase = makeCreateComentUseCase()

        const { coment } = await createComentUseCase.execute({
            conteudo,
            usuarioPublicId,
            postPublicId
        })

        return reply.status(201).send({coment: ComentPresenter.toHTTP(coment)})
    } catch (error) {
        throw error
    }
}