import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import textUtils from '../utils/textUtils';
import promptUtils from '../utils/promptUtils';
import { PromptChatMessage } from '../models/promptChatMessageModel';
import { PromptParameter } from '../models/promptParameter';

const getPrompts = async (
    externalId: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    limit: number,
    offset: number,
) => {
    return await promptModel.getAll(
        externalId,
        search_term,
        languages_ids,
        repositories_ids,
        technologies_ids,
        limit,
        offset,
    );
};

const getPromptById = async (promptId: number) => {
    return await promptModel.getOneById(promptId);
};

const createPrompt = async (
    externalId: string,
    title: string,
    description: string,
    content: string,
    response: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number,
    templatesIds: number[],
    modifiersIds: number[],
    chatMessages: PromptChatMessage[],
    promptParameters: PromptParameter[]
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    // Clone
    const history: any = [];
    chatMessages.forEach(h => history.push(h));

    return await promptModel.createOne(
        user.id,
        title,
        textUtils.toSlug(title),
        description,
        content,
        response,
        languageId,
        repositoryId,
        technologyId,
        providerId,
        templatesIds,
        modifiersIds,
        history,
        chatMessages,
        promptParameters
    )
}

const updatePrompt = async (
    id: number,
    externalId: string,
    title: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number,
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await promptModel.updateOne(
        id,
        user.id,
        title,
        textUtils.toSlug(title),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        providerId,
    )
}

const applyModifiersAndTemplatesFromPrompt = async (promptId: number): Promise<string> => {
    const prompt = await promptModel.getOneById(promptId);

    if (!prompt) return "";

    // Apply language from first selected template
    const languageSlug = prompt.language.slug;

    const templates = JSON.parse(JSON.stringify(prompt.prompts_templates));
    const modifiers = JSON.parse(JSON.stringify(prompt.prompts_modifiers));

    const modifiersIdsUsed: number[] = [];

    let texts: string[] = [];

    if (templates.length > 0) {
        templates.forEach((t: any) => {
            if (t.modifiers) {
                const templateModifiers = JSON.parse(JSON.stringify(t.modifiers));

                templateModifiers.forEach((m: any) => {
                    if (modifiersIdsUsed.includes(m.id)) {
                        return;
                    }

                    modifiersIdsUsed.push(m.id);
                    texts.push(m.content);
                })
            }
        });

    } else if (modifiers.length > 0) {
        texts = modifiers.map((m: any) => m.content);
    }

    return await promptUtils.optimizeText(prompt.content, texts, languageSlug);

}

const deletePrompt = async (id: number) => {
    return await promptModel.deleteOne(id);
}

export default {
    getPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt,
    applyModifiersAndTemplatesFromPrompt
}