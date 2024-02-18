import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';
import promptUtils from '../utils/promptUtils';
import { PromptChatMessage } from '../models/promptChatMessageModel';

const getModifiers = async (
    externalId: string,
    searchTerm: string,
    languagesIds: number[],
    repositoriesIds: number[],
    technologiesIds: number[],
    limit: number,
    offset: number
) => {
    return await modifierModel.getAllByFilters(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
        technologiesIds,
        limit,
        offset
    );
};

const getAllModifiers = async (
    externalId: string,
) => {
    return await modifierModel.getAllByUser(
        externalId,
    );
};

const getModifierById = async (modifierId: number) => {
    return await modifierModel.getOneById(modifierId);
};

const createModifier = async (
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await modifierModel.createOne(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        providerId,
    )
}

const updateModifier = async (
    id: number,
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await modifierModel.updateOne(
        id,
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        providerId,
    )
}

const deleteModifier = async (id: number) => {
    return await modifierModel.deleteOne(id);
}

const applyModifiersToText = async (text: string, modifiersIds: number[], isChat = false): Promise<string> => {
    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    if (modifiers.length <= 0) return text;

    // Apply language from first selected modifier
    const languageSlug = modifiers[0].language.slug;

    // Extract all modifiers texts
    const texts = modifiers.map(m => m.content);

    return promptUtils.optimizeText(text, texts, languageSlug);
}

const applyModifiersToChat = async (
    text: string,
    modifiersIds: number[],
    chatMessages: PromptChatMessage[]
): Promise<{ textModified: string, chatMessagesModified: PromptChatMessage[] }> => {
    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    if (modifiers.length <= 0) return { textModified: text, chatMessagesModified: chatMessages };

    // Apply language from first selected modifier
    const languageSlug = modifiers[0].language.slug;

    // Extract all modifiers texts
    const texts = modifiers.map(m => m.content);

    return promptUtils.optimizeChat(text, texts, chatMessages, languageSlug);
}

export default {
    getModifiers,
    getAllModifiers,
    getModifierById,
    createModifier,
    updateModifier,
    deleteModifier,
    applyModifiersToText,
    applyModifiersToChat
}