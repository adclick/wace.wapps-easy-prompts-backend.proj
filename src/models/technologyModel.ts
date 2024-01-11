import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
    return await prisma.technology.findMany();
}

const getOneDefault = async () => {
    return await prisma.technology.findFirst({
        where: {
            default: true
        }
    });
}

export default {
    getAll,
    getOneDefault
}