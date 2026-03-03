import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeCreatePostUseCase } from "@/use-cases/factories/make-create-post.js"
import { PostPresenter } from "@/http/presenters/post-presenter.js"


export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createPostBodySchema = z.object({
            titulo: z.string().trim().min(1),
            conteudo: z.string().trim().min(1),
            usuarioPublicId: z.string().uuid()
        })
        const { titulo, conteudo, usuarioPublicId } = createPostBodySchema.parse(request.body)

        const createPostUseCase = makeCreatePostUseCase()

        const { post } = await createPostUseCase.execute({
            titulo,
            conteudo,
            usuarioPublicId
        })

        return reply.status(201).send({post: PostPresenter.toHTTP(post)})
    } catch (error) {
        throw error
    }
}