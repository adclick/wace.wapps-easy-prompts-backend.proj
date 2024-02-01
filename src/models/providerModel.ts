import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneById = async (id: number) => {
    return await prisma.provider.findUnique({where: {id}});
}

const getAllByIds = async (ids: number[]) => {
    return await prisma.provider.findMany({
        include: {
            technology: true,
            parameters: true,
        },
        where: {
            id: {
                in: ids
            }
        },
        orderBy: {
            id: "asc"
        }
    })
}

const getOneDefaultByTechnologyId = async (technology_id: number, defaultVal: boolean = true) => {
    return await prisma.provider.findFirst({
        include: {
            technology: true,
            parameters: true
        },
        where: {
            technology_id: technology_id
        }
    })
}

const getAll = async (technology_id: number) => {
    return await prisma.provider.findMany({
        include: {
            technology: true,
            parameters: true
        },
        where: {
            technology_id: technology_id
        },
        orderBy: {
            id: "asc"
        }
    })
}

export default {
    getOneById,
    getAllByIds,
    getOneDefaultByTechnologyId,
    getAll
}