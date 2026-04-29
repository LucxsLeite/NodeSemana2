import type nodemailer from 'nodemailer'
import { sendEmail } from '@/utils/send-email.js'

interface SendEmailUseCaseRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: nodemailer.SendMailOptions['attachments']
}

export class SendEmailUseCase {
  async execute({
    to,
    subject,
    message,
    html,
    attachments,
  }: SendEmailUseCaseRequest) {
    return await sendEmail({ to, subject, message, html, attachments })
  }
}
