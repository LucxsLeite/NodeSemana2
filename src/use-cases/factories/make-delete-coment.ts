import { PrismaComentsRepository } from "@/repositories/prisma/coments-prisma-repository.js";
import { DeleteComentUseCase } from "../coments/delete-coment.js";

export function makeDeleteComentUseCase() {
    const comentsRepository = new PrismaComentsRepository()
    const deleteComentUseCase = new DeleteComentUseCase(comentsRepository)

    return deleteComentUseCase
}