import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { CreateLikeUseCase } from "../likes/create-like.js";
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { PrismaComentsRepository } from "@/repositories/prisma/coments-prisma-repository.js";
import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository.js";

export function makeCreateLikeUseCase() {
    const likeRepository = new PrismaLikesRepository()
    const userRepository = new PrismaUsersRepository()
    const postRepository = new PrismaPostsRepository()
    const comentRepository = new PrismaComentsRepository()
    const createLikeUseCase = new CreateLikeUseCase(likeRepository, userRepository, postRepository, comentRepository)

    return createLikeUseCase
}