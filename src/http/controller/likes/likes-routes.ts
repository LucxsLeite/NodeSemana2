import type { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import { createLike } from "./create-like.controller.js"
import { getLike } from "./get-like.controller.js"
import { getUserLikes } from "./get-user-likes.controller.js"
import { getPostLikes } from "./get-post-likes.controller.js"
import { deleteLike } from "./delete-like.controller.js"
import { getComentLikes } from "./get-coment-likes.controller.js"

export async function postRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyJwt]}, createLike)
    app.get('/:publicId', getLike)
    app.get('/user/:publicId', getUserLikes)
    app.get('/post/:publicId', getPostLikes)
    app.get('/coment/:publicId', getComentLikes)
    app.delete('/:publicId', {onRequest: [verifyJwt]}, deleteLike)
}