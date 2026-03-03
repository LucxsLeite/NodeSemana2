import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { GetAllPostsUseCase } from "../posts/get-all-posts.js";

export function makeGetAllPostsUseCase() {
    const postsRepository = new PrismaPostsRepository()
    const getAllPostsUseCase = new GetAllPostsUseCase(postsRepository)

    return getAllPostsUseCase
}