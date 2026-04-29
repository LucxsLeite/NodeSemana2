import type { FastifyReply, FastifyRequest } from 'fastify'
import { messages } from '@/constants/messages.js'
import { forgotPasswordSchema } from '@/http/schemas/utils/recover-password-schema.js'
import { logger } from '@/lib/logger/index.js'
import { forgotPasswordHtmlTemplate } from '@/templates/forgot-password-html.js'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password-text.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeRecoverPasswordUseCase } from '@/use-cases/factories/make-recover-password.js'
import { SendEmailUseCase } from '../messaging/send-email.js'

export async function recoverPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { login } = forgotPasswordSchema.parse(request.body)

    const forgotPasswordUseCase = makeRecoverPasswordUseCase()

    const { user, token } = await forgotPasswordUseCase.execute({ login })

    const sendEmailUseCase = new SendEmailUseCase()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: messages.email.passwordRecoverySubject,
      message: forgotPasswordTextTemplate(user.nome, token),
      html: forgotPasswordHtmlTemplate(user.nome, token),
    })

    logger.info({ targetId: user.publicId }, 'Password reset email sent')

    return reply
      .status(200)
      .send({ message: messages.info.passwordResetGeneric })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(200).send({ message: error.message })
    }

    throw error
  }
}
