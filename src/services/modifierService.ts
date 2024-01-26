import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';
import promptService from './promptService';
import promptUtils from '../utils/promptUtils';
import { History } from './aiChatService';

const getModifiers = async (
    externalId: string,
    searchTerm: string,
    languagesIds: number[],
    repositoriesIds: number[],
    limit: number,
    offset: number
) => {
    return await modifierModel.getAll(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
        limit,
        offset
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

const applyModifiersToChat = async (text: string, modifiersIds: number[], history: History[]): Promise<{ textModified: string, historyModified: History[] }> => {
    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    if (modifiers.length <= 0) return {textModified: text, historyModified: history};

    // Apply language from first selected modifier
    const languageSlug = modifiers[0].language.slug;

    // Extract all modifiers texts
    const texts = modifiers.map(m => m.content);

    return promptUtils.optimizeChat(text, texts, history, languageSlug);
}

export default {
    getModifiers,
    getModifierById,
    createModifier,
    deleteModifier,
    applyModifiersToText,
    applyModifiersToChat
}