import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TEMPERATURE = 'temperature';

const getOneById = async (id: number) => {
    return await prisma.parameter.findUnique({ where: { id } });
}

const getTemperature = async (provider_id: number) => {
    return await prisma.parameter.findUnique({
        where: {
            slug_provider_id: {
                slug: TEMPERATURE, 
                provider_id
            }
        }
    });
}

export default {
    getOneById,
    getTemperature,
}