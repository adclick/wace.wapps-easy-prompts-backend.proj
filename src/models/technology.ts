import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTechnologies = async () => {
    return await prisma.technologies.findMany();
}

export default {
    getTechnologies
}