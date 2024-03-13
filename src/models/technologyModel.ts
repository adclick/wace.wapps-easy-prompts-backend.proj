import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneByUUID = async (uuid: string) => await prisma.technology.findUnique({where: {uuid}});

const getAllByUUIDs = async (uuids: string[]) => {
    return await prisma.technology.findMany({
        where: {
            uuid: { in: uuids }
        }
    })
}

const getAll = async () => {
    return await prisma.technology.findMany();
}

const getOneDefault = async () => {
    return await prisma.technology.findFirst({
        where: {
            default: true
        }
    });
}

export default {
    getOneByUUID,
    getAllByUUIDs,
    getAll,
    getOneDefault
}