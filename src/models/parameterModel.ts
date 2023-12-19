import { PrismaClient } from "@prisma/client";
import technologyModel from "./technologyModel";

const prisma = new PrismaClient();

const getParameters = async (technology_id: number, provider_id: number) => {
    return await prisma.parameters.findMany({
        where: {
            technology_id,
            provider_id
        }
    });
}

export default {
    getParameters
}