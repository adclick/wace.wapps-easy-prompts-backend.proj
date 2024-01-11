import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
    return await prisma.language.findMany();
}

export default {
    getAll
}