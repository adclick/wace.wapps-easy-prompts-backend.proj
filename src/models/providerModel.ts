import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDefaultProviderByDefaultTechnology = async () => {
    return await prisma.providers.findFirst({
        where: {
            technologies_providers: {
                some: {
                    technologies: {
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
    return await prisma.providers.findFirst({
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

export default {
    getDefaultProviderByDefaultTechnology,
    getDefaultProviderByTechnologyId
}