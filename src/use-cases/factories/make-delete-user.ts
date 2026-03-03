import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { DeleteUserUseCase } from "../users/delete-user.js";

export function makeDeleteUserUseCase() {
    const userRepository = new PrismaUsersRepository()
    const deleteUserUseCase = new DeleteUserUseCase(userRepository)

    return deleteUserUseCase
}