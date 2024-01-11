import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const upsertOne = async (repository_id: number, user_id: number) => {
    return await prisma.userRepository.upsert({
        where: {
            user_id_repository_id: { repository_id, user_id }
        },
        update: { repository_id, user_id },
        create: { repository_id, user_id }
    });
}

export default {
    upsertOne,
}