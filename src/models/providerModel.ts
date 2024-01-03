import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDefaultProviderByDefaultTechnology = async () => {
    return await prisma.provider.findFirst({
        where: {
            technologies_providers: {
                some: {
                    technology: {
                        is: {
                            default: true
                        }
                    }
                }
            },
            default: true
        }
    });
}

const getDefaultProviderByTechnologyId = async (technology_id: number) => {
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

const getProvidersByTechnologyId = async (technology_id: number) => {
    return await prisma.provider.findFirst({
        where: {
            technologies_providers: {
                some: {
                    technology_id,
                }
            }
        }
    })
}



export default {
    getDefaultProviderByDefaultTechnology,
    getDefaultProviderByTechnologyId,
    getProvidersByTechnologyId
}