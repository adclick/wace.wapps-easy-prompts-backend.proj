import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
    return await prisma.mode.findMany();
}

const getOneDefault = async () => {
    return await prisma.mode.findFirst();
}

export default {
    getAll,
    getOneDefault
}