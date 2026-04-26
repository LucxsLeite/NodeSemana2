import cron from 'node-cron'
import { makeGetTrendingPostsUseCase } from '@/use-cases/factories/make-get-trending-posts.js'
import nodemailer from 'nodemailer'
import { env } from '@/env/index.js'

export function startTrendingPostsJob() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.SMTP_EMAIL,
      pass: env.SMTP_PASSWORD
    }
  })

  cron.schedule('* * * * *', async () => {
    try {
      console.log('Rodando job...')

      const useCase = makeGetTrendingPostsUseCase()
      const { posts } = await useCase.execute()

      const options = {
        from: 'Lucas Leite <lucasla@id.uff.br>',
        to: 'lucas.andrade@injunior.com.br',
        subject: 'Trending Posts',
        text: posts.map(p => `• ${p.titulo}`).join('\n')
      }

      await transporter.sendMail(options)

      console.log('E-mail enviado!')
    } catch (error) {
      console.error(error)
    }
  })
}