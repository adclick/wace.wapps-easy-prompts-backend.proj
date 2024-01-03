import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTechnologies = async () => {
    return await prisma.technology.findMany();
}

const getDefaultTechnology = async () => {
    return await prisma.technology.findFirst({
        where: {
            default: true
        }
    });
}

export default {
    getTechnologies,
    getDefaultTechnology
}