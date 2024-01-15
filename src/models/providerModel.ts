import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.provider.findUnique({where: {id}});
}

const getAllByIds = async (ids: number[]) => {
    return await prisma.provider.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
}

const getOneDefaultByTechnologyId = async (technology_id: number, defaultVal: boolean = true) => {
    return await prisma.provider.findFirst({
        where: {
            technologies_providers: {
                some: {
                    technology_id,
                    default: defaultVal
                }
            }
        }
    })
}

const getAll = async (technology_id: number) => {
    return await prisma.provider.findMany({
        where: {
            technologies_providers: {
                some: { technology_id }
            }
        }
    })
}

export default {
    getOneById,
    getAllByIds,
    getOneDefaultByTechnologyId,
    getAll
}