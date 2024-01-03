import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTechnologies = async () => {
    return await prisma.technology.findMany();
}

const getDefault = async () => {
    return await prisma.technology.findFirst({
        where: {
            default: true
        }
    });
}

export default {
    getTechnologies,
    getDefault
}