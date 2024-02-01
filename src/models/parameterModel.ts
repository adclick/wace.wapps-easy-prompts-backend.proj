import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.parameter.findUnique({where: {id}});
}

export default {
    getOneById,
}