import type { Usuario } from "@/@types/prisma/client.js"
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error.js";
import type { UsersRepository } from "@/repositories/users-repository.js";

interface RegisterUserUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
    foto: string | null;
}

type RegisterUserUseCaseResponse = {
    user: Usuario
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    nome,
    email,
    senha,
    foto,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    try {
      const userWithSameEmailOrUsername =
        await this.usersRepository.findByEmail(email)

      if (userWithSameEmailOrUsername) {
        throw new ItemAlreadyExistsError()
      }

      const senhaHash = await hash(senha, env.HASH_SALT_ROUNDS)

      const user = await this.usersRepository.createUser({
        nome,
        email,
        senhaHash,
        foto,
      })

      return { user }
    } catch (error) {
      throw error
    }
  }
}