import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTechnologies = async () => {
    return await prisma.technologies.findMany();
}

const getDefaultTechnology = async () => {
    return await prisma.technologies.findFirst({
        where: {
            default: true
        }
    });
}

export default {
    getTechnologies,
    getDefaultTechnology
}