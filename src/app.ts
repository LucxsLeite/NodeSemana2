import fastify from 'fastify'
import { appRoutes } from './http/controller/routes.js'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format(),
        })
    }

    if (error instanceof SyntaxError) {
        return reply.status(400).send({
            message: 'O corpo da requisição não está em formato válido'
        })
    }
})