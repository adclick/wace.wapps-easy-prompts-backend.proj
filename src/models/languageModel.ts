import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneByUUID = async (uuid: string) => await prisma.language.findUnique({ where: { uuid } });

const getAllByUUIDs = async (uuids: string[]) => {
    return await prisma.language.findMany({
        where: {
            uuid: { in: uuids }
        }
    })
}

const getAll = async () => {
    return await prisma.language.findMany();
}

const getDefault = async () => {
    return await prisma.language.findFirst({
        where: {
            default: true
        }
    })
}

export default {
    getOneByUUID,
    getAllByUUIDs,
    getAll,
    getDefault
}