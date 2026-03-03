import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { GetAllUsersUseCase } from "../users/get-all-users.js";

export function makeGetAllUsersUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)

    return getAllUsersUseCase
}