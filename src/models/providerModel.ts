import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getById = async (id: number) => {
    return await prisma.provider.findUnique({where: {id}});
}

const getDefault = async (technology_id: number) => {
    return await prisma.provider.findFirst({
        where: {
            technologies_providers: {
                some: {
                    technology_id,
                    default: true
                }
            }
        }
    })
}

const getProviders = async (technology_id: number) => {
    return await prisma.provider.findMany({
        where: {
            technologies_providers: {
                some: { technology_id }
            }
        }
    })
}

export default {
    getById,
    getDefault,
    getProviders
}