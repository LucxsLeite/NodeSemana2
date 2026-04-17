import { z } from 'zod'
import { emailSchema } from './email.js'
import { usernameSchema } from './username.js'

export const forgotPasswordSchema = z.object({
  login: z.union([usernameSchema, emailSchema]),
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>