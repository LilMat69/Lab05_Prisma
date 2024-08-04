import { PrismaClient } from "@prisma/client";
//This is a file to reuse the prisma client all over the project.
export const prisma = new PrismaClient()