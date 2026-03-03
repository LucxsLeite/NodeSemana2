import { PrismaComentsRepository } from "@/repositories/prisma/coments-prisma-repository.js";
import { GetComentUseCase } from "../coments/get-coment.js";

export function makeGetComentUseCase() {
    const comentRepository = new PrismaComentsRepository()
    const getComentUseCase = new GetComentUseCase(comentRepository)

    return getComentUseCase
}