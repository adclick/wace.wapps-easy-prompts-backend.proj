import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLanguages = async () => {
    return await prisma.languages.findMany();
}

export default {
    getLanguages
}