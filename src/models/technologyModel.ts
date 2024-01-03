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

const getProviders = async (technology_id: number) => {
    return await prisma.technology.findMany({
        where: {
            technologies_providers: {
                every: {
                    technology_id
                }
            }
        }
    })
}

export default {
    getTechnologies,
    getDefaultTechnology
}