import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js"
import { GetTrendingPostsUseCase } from "../posts/get-trending-posts.js"

export function makeGetTrendingPostsUseCase() {
  const postsRepository = new PrismaPostsRepository()
  return new GetTrendingPostsUseCase(postsRepository)
}