import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository.js"
import { GetComentLikesUseCase } from "../likes/get-coment-likes.js"
import { PrismaComentsRepository } from "@/repositories/prisma/coments-prisma-repository.js"

export function makeGetComentLikesUseCase() {
  const comentsRepository = new PrismaComentsRepository()
  const likesRepository = new PrismaLikesRepository()
  const useCase = new GetComentLikesUseCase(likesRepository, comentsRepository)

  return useCase
}