import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLanguages = async () => {
    return await prisma.language.findMany();
}

export default {
    getLanguages
}