import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
    return await prisma.language.findMany();
}

const getDefault = async () => {
    return await prisma.language.findFirst({
        where: {
            default: true
        }
    })
}

export default {
    getAll,
    getDefault
}