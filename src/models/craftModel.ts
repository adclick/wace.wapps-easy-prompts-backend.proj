import { PrismaClient } from "@prisma/client";
import { CRAFT_TYPE } from "@prisma/client";

const prisma = new PrismaClient();

const getTypes = async () => {
    return await prisma.crafts.findMany({
        distinct: ["type"],
        select: { type: true }
    });
}

const getCrafts = async (
    user_id: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    crafts_types: CRAFT_TYPE[]
) => {
    return await prisma.crafts.findMany({
        where: {
            users: {
                auth0_id: user_id
            },
            content: {
                contains: search_term
            },
            languages: {
                id: {
                    in: languages_ids
                }
            },
            repositories: {
                id: {
                    in: repositories_ids
                }
            },
            technologies: {
                id: {
                    in: technologies_ids
                }
            },
            type: {
                in: crafts_types
            }
        }
    })
}

export default {
    getTypes,
    getCrafts
}