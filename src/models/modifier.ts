import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getModifiersByPromptId = async (promptId: number) => {
    return await prisma.modifiers.findMany({
        where: {
            prompts_modifiers: {
                some: {
                    prompt_id: promptId 
                }
            }
        }
    });
}

export default {
    getModifiersByPromptId
}