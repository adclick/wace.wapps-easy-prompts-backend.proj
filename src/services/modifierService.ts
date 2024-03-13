import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';
import promptUtils from '../utils/promptUtils';
import { PromptChatMessage } from '../models/promptChatMessageModel';
import languageService from './languageService';
import repositoryService from './repositoryService';
import technologyService from './technologyService';
import BadRequestError from '../errors/BadRequestError';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import providerModel from '../models/providerModel';
import templateModel from '../models/templateModel';

const getIdsFromUUIDs = async (uuids: string[]) => {
    const modifiers = await modifierModel.getAllByUUIDs(uuids);

    return modifiers.map(l => l.id);
}

const getModifiers = async (
    externalId: string,
    searchTerm: string,
    languages_uuids: string[],
    repositories_uuids: string[],
    technologies_uuids: string[],
    limit: number,
    offset: number
) => {
    const languagesIds = await languageService.getIdsFromUUIDs(languages_uuids);
    const repositoriesIds = await repositoryService.getIdsFromUUIDs(repositories_uuids);
    const technologiesIds = await technologyService.getIdsFromUUIDs(technologies_uuids);

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

const getAllModifiers = async (externalId: string) => {
    return await modifierModel.getAllByUser(
        externalId,
    );
};

const getModifierById = async (modifierUUID: string) => {
    const modifier = await modifierModel.getOneByUUID(modifierUUID);

    if (!modifier) throw new BadRequestError({ message: `Prompt "${modifierUUID}" not found` });

    return await modifierModel.getOneById(modifier.id);
};

const createModifier = async (
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageUUID: string,
    repositoryUUID: string,
    technologyUUID: string,
    providerUUID: string
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const language = await languageModel.getOneByUUID(languageUUID);
    if (!language) throw new BadRequestError({ message: `Language "${languageUUID}" not found` });

    const repository = await repositoryModel.getOneByUUID(repositoryUUID);
    if (!repository) throw new BadRequestError({ message: `Repository "${repositoryUUID}" not found` });

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    let providerId = null;
    if (providerUUID !== null) {
        let provider = await providerModel.getOneByUUID(providerUUID);
        if (provider) {
            providerId = provider.id;
        }
    }

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repository.id
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await modifierModel.createOne(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        language.id,
        repository.id,
        technology.id,
        providerId,
    )
}

const updateModifier = async (
    uuid: string,
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageUUID: string,
    repositoryUUID: string,
    technologyUUID: string,
    providerUUID: string
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const modifier = await modifierModel.getOneByUUID(uuid);
    if (!modifier) throw new BadRequestError({ message: `Modiifier "${uuid}" not found` });

    const language = await languageModel.getOneByUUID(languageUUID);
    if (!language) throw new BadRequestError({ message: `Language "${languageUUID}" not found` });

    const repository = await repositoryModel.getOneByUUID(repositoryUUID);
    if (!repository) throw new BadRequestError({ message: `Repository "${repositoryUUID}" not found` });

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    let providerId = null;
    if (providerUUID !== null) {
        let provider = await providerModel.getOneByUUID(providerUUID);
        if (provider) {
            providerId = provider.id;
        }
    }

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repository.id
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await modifierModel.updateOne(
        modifier.id,
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        language.id,
        repository.id,
        technology.id,
        providerId,
    )
}

const deleteModifier = async (uuid: string) => {
    const modifier = await modifierModel.getOneByUUID(uuid);
    if (!modifier) throw new BadRequestError({ message: `Modiifier "${uuid}" not found` });

    return await modifierModel.deleteOne(modifier.id);
}

const applyModifiersToText = async (text: string, modifiersIds: string[], isChat = false): Promise<string> => {
    const modifiers = await modifierModel.getAllByUUIDs(modifiersIds);

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

const deduplicateModifiersIds = async (templatesUUIDs: string[], modifiersUUIDs: string[]) => {
    const templates = await templateModel.getAllByUUIDs(templatesUUIDs);

    for (const template of templates) {
        const templateModifiersIds = template.templates_modifiers.map(m => m.modifier.uuid);

        for (const templateModifierId of templateModifiersIds) {
            if (modifiersUUIDs.includes(templateModifierId)) {
                continue;
            }

            modifiersUUIDs.push(templateModifierId);
        }
    }

    return modifiersUUIDs;
}

export default {
    getIdsFromUUIDs,
    getModifiers,
    getAllModifiers,
    getModifierById,
    createModifier,
    updateModifier,
    deleteModifier,
    applyModifiersToText,
    applyModifiersToChat,
    deduplicateModifiersIds
}