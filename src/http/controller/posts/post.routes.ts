import type { FastifyInstance } from "fastify"
import { createPost } from "./post.controller.js"
import { updatePost } from "./update-post.controller.js"
import { deletePost } from "./delete-post.controller.js"
import { getAllPosts } from "./get-all-posts.controller.js"
import { getPost } from "./get-post.controller.js"
import { getUserPosts } from "./get-user-posts.controller.js"
import { verifyJwt } from "@/http/middlewares/verify-jwt.js"

export async function postRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyJwt]}, createPost)
    app.get('/:publicId', getPost)
    app.get('/user/:publicId', getUserPosts)
    app.get('/', getAllPosts)
    app.delete('/:publicId', {onRequest: [verifyJwt]}, deletePost)
    app.patch('/:publicId', {onRequest: [verifyJwt]}, updatePost)
}