import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
  LOG_LEVEL: z
    .enum(['info', 'debug', 'warn', 'error', 'trace'])
    .default('info'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3333),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string(),
  APP_NAME: z.string().default('Backend Template Reborn'),
  APP_PORT: z.coerce.number().default(3000),
  JWT_SECRET: z
    .string()
    .min(60, 'JWT secret must be at least 60 characters long'),
  FRONTEND_URL: z.url().default('http://localhost:5173'),
  HASH_SALT_ROUNDS: z.coerce.number().default(12),
  SMTP_EMAIL: z.email(),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_PORT: z.coerce.number(),
  SMTP_HOST: z.string().min(1),
  SMTP_SECURE: z.enum(['true', 'false']).transform((val) => val === 'true'),
})
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error)
  throw new Error('Invalid environment variables.')
}
export const env = _env.data
