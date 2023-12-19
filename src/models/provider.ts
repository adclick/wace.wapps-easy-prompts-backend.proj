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

export default {
    getDefaultProviderByDefaultTechnology
}