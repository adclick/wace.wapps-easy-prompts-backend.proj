import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getParameters = async (technology_id: number, provider_id: number) => {
    return await prisma.parameter.findMany({
        where: {
            technology_id,
            provider_id
        }
    });
}

export default {
    getParameters
}