import { PrismaComentsRepository } from "@/repositories/prisma/coments-prisma-repository.js";
import { GetAllComentsUseCase } from "../coments/get-all-coments.js";

export function makeGetAllComentsUseCase() {
    const comentsRepository = new PrismaComentsRepository()
    const getAllComentsUseCase = new GetAllComentsUseCase(comentsRepository)

    return getAllComentsUseCase
}