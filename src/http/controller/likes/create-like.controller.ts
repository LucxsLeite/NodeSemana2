import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateLikeUseCase } from "@/use-cases/factories/make-create-like.js"
import { LikePresenter } from "@/http/presenters/like-presenter.js"
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error.js"

export async function createLike(request: FastifyRequest,reply: FastifyReply) {
    try {
        const bodySchema = z.object({
        postPublicId: z.string().uuid().optional(),
        usuarioPublicId: z.string().uuid(),
        comentPublicId: z.string().uuid().optional(),
    })

    const { postPublicId, usuarioPublicId, comentPublicId } = bodySchema.parse(request.body)

    const createLikeUseCase = makeCreateLikeUseCase()

    const { like } = await createLikeUseCase.execute({
        usuarioPublicId,
        postPublicId,
        comentPublicId,
    })

    return reply.status(201).send({like: LikePresenter.toHTTP(like)})
    } catch(error) {
        if (error instanceof ItemAlreadyExistsError) {
                return reply.status(404).send({ message: error.message})
            }
            throw error
    }
}