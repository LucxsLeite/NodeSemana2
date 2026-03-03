import { PrismaComentsRepository } from "@/repositories/prisma/coments-prisma-repository.js";
import { UpdateComentUseCase } from "../coments/update-coment.js";

export function makeUpdateComentUseCase() {
    const comentsRepository = new PrismaComentsRepository()
    const updateComentUseCase = new UpdateComentUseCase(comentsRepository)

    return updateComentUseCase
}