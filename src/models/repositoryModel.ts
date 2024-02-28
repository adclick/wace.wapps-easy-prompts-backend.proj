import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOneByUUID = async (uuid: string) => await prisma.repository.findUnique({where: {uuid}});

const getAllByUUIDs = async (uuids: string[]) => {
    return await prisma.repository.findMany({
        where: {
            uuid: { in: uuids }
        }
    })
}

const getOneBySlug = async (slug: string) => {
    return await prisma.repository.findFirst({
        where: { slug }
    });
}

const getDefault = async (external_id: string) => {
    return await prisma.repository.findFirst({
        where: {
            user: {external_id},
            
        }
    })
}

const upsertOne = async (name: string, slug: string, user_id: number, isDefault: boolean) => {
    return await prisma.repository.upsert({
        where: {
            user_id_slug: { user_id, slug }
        },
        update: { name, slug, default: isDefault },
        create: { name, slug, user_id, default: isDefault }
    })
}

const getAllByUser = async (external_id: string) => {
    return await prisma.repository.findMany({
        where: {
            OR: [
                {
                    user: { external_id }
                },
                {
                    users_repositories: {
                        some: {
                            user: { external_id }
                        }
                    }
                }
            ]
        }
    })
}

const getAllPrivateByUser = async (external_id: string) => {
    return await prisma.repository.findMany({
        where: {
            user: { external_id },
            users_repositories: {
                none: {
                    user: { external_id }
                }
            }
        }
    })
}

const getAllSubscribedByUser = async (external_id: string) => {
    return await prisma.repository.findMany({
        where: {
            OR: [
                {
                    users_repositories: {
                        some: {
                            user: { external_id }
                        }
                    }
                }
            ]
        }
    })
}

const getOneByUserAndRepository = async (external_id: string, repository_id: number) => {
    return await prisma.repository.findFirst({
        where: {
            OR: [
                {
                    user: {
                        external_id
                    }
                },
                {
                    users_repositories: {
                        some: {
                            repository_id,
                            user: {
                                external_id
                            }
                        }
                    }
                }
            ]
        }
    })
}

export default {
    getOneByUUID,
    getAllByUUIDs,
    getOneBySlug,
    upsertOne,
    getAllByUser,
    getAllPrivateByUser,
    getAllSubscribedByUser,
    getOneByUserAndRepository
}