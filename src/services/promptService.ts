import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import textUtils from '../utils/textUtils';
import promptUtils from '../utils/promptUtils';
import promptChatMessageModel, { PromptChatMessage } from '../models/promptChatMessageModel';
import { PromptParameter } from '../models/promptParameter';
import languageService from './languageService';
import repositoryService from './repositoryService';
import technologyService from './technologyService';
import BadRequestError from '../errors/BadRequestError';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import providerModel from '../models/providerModel';
import templateService from './templateService';
import modifierService from './modifierService';
import modifierModel from '../models/modifierModel';
import templateModel from '../models/templateModel';

const getPrompts = async (
    externalId: string,
    search_term: string,
    languages_uuids: string[],
    repositories_uuids: string[],
    technologies_uuids: string[],
    limit: number,
    offset: number,
) => {
    const languagesIds = await languageService.getIdsFromUUIDs(languages_uuids);
    const repositoriesIds = await repositoryService.getIdsFromUUIDs(repositories_uuids);
    const technologiesIds = await technologyService.getIdsFromUUIDs(technologies_uuids);

    return await promptModel.getAll(
        externalId,
        search_term,
        languagesIds,
        repositoriesIds,
        technologiesIds,
        limit,
        offset,
    );
};

const getPromptById = async (promptUUID: string) => {
    const prompt = await promptModel.getOneByUUID(promptUUID);
    
    if (!prompt) throw new BadRequestError({ message: `Prompt "${promptUUID}" not found` });

    return await promptModel.getOneById(prompt.id);
};

const createPrompt = async (
    externalId: string,
    title: string,
    description: string,
    content: string,
    languageUUID: string,
    repositoryUUID: string,
    technologyUUID: string,
    providerUUID: string,
    templatesUUIDs: string[],
    modifiersUUIDs: string[],
    chatMessages: PromptChatMessage[],
    promptParameters: PromptParameter[]
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const language = await languageModel.getOneByUUID(languageUUID);
    if (!language) throw new BadRequestError({ message: `Language "${languageUUID}" not found` });

    const repository = await repositoryModel.getOneByUUID(repositoryUUID);
    if (!repository) throw new BadRequestError({ message: `Repository "${repositoryUUID}" not found` });

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repository.id
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    let providerId = null;
    if (providerUUID !== null) {
        let provider = await providerModel.getOneByUUID(providerUUID);
        if (provider) {
            providerId = provider.id;
        }
    }

    const templates = await templateModel.getAllByUUIDs(templatesUUIDs);
    const modifiers = await modifierModel.getAllByUUIDs(modifiersUUIDs);

    const promptChatMessages = chatMessages.map(cm => {
        return {
            role: cm.role,
            message: cm.message,
            user_id: user.id,
            threads_chat_messages_templates: cm.threads_chat_messages_templates,
            threads_chat_messages_modifiers: cm.threads_chat_messages_modifiers
        }
    });

    const prompt = await promptModel.createOne(
        user.id,
        title,
        textUtils.toSlug(title),
        description,
        content,
        language.id,
        repository.id,
        technology.id,
        providerId,
        templates,
        modifiers,
        promptParameters
    );

    for (const pcm of promptChatMessages) {
        const templatesUUIDs = pcm.threads_chat_messages_templates.map(t => t.template.uuid);
        const templatesIds = await templateService.getIdsFromUUIDs(templatesUUIDs);

        const modifiersUUIDs = pcm.threads_chat_messages_modifiers.map(m => m.modifier.uuid);
        const modifiersIds = await modifierService.getIdsFromUUIDs(modifiersUUIDs);

        await promptChatMessageModel.createOne(
            pcm.role,
            pcm.message,
            prompt.id,
            user.id,
            templatesIds,
            modifiersIds
        );
    }

    return await promptModel.getOneById(prompt.id);
}

const updatePrompt = async (
    uuid: string,
    externalId: string,
    title: string,
    description: string,
    content: string,
    languageUUID: string,
    repositoryUUID: string,
    technologyUUID: string,
    providerUUID: string,
    templatesUUIDs: string[],
    modifiersUUIDs: string[],
    chatMessages: PromptChatMessage[],
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const prompt = await promptModel.getOneByUUID(uuid);
    if (!prompt) throw new BadRequestError({ message: `Prompt "${uuid}" not found` });

    const language = await languageModel.getOneByUUID(languageUUID);
    if (!language) throw new BadRequestError({ message: `Language "${languageUUID}" not found` });

    const repository = await repositoryModel.getOneByUUID(repositoryUUID);
    if (!repository) throw new BadRequestError({ message: `Repository "${repositoryUUID}" not found` });

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repository.id
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    let providerId = null;
    if (providerUUID !== null) {
        let provider = await providerModel.getOneByUUID(providerUUID);
        if (provider) {
            providerId = provider.id;
        }
    }

    const templatesIds = await templateService.getIdsFromUUIDs(templatesUUIDs);
    const modifiersIds = await modifierService.getIdsFromUUIDs(modifiersUUIDs);

    await promptModel.updateOne(
        prompt.id,
        user.id,
        title,
        textUtils.toSlug(title),
        description,
        content,
        language.id,
        repository.id,
        technology.id,
        providerId,
        templatesIds,
        modifiersIds,
    );

    const promptChatMessages = chatMessages.map(cm => {
        return {
            role: cm.role,
            message: cm.message,
            user_id: user.id,
            threads_chat_messages_templates: cm.threads_chat_messages_templates,
            threads_chat_messages_modifiers: cm.threads_chat_messages_modifiers
        }
    });

    await promptChatMessageModel.deleteAllByPromptId(prompt.id);

    for (const pcm of promptChatMessages) {
        const templatesUUIDs = pcm.threads_chat_messages_templates.map(t => t.template.uuid);
        const templatesIds = await templateService.getIdsFromUUIDs(templatesUUIDs);

        const modifiersUUIDs = pcm.threads_chat_messages_modifiers.map(m => m.modifier.uuid);
        const modifiersIds = await modifierService.getIdsFromUUIDs(modifiersUUIDs);

        await promptChatMessageModel.createOne(
            pcm.role,
            pcm.message,
            prompt.id,
            user.id,
            templatesIds,
            modifiersIds
        );
    }

    return await promptModel.getOneById(prompt.id);
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

const deletePrompt = async (uuid: string) => {
    const prompt = await promptModel.getOneByUUID(uuid);
    if (!prompt) throw new BadRequestError({ message: `Prompt "${uuid}" not found` });
    
    return await promptModel.deleteOne(prompt.id);
}

export default {
    getPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt,
    applyModifiersAndTemplatesFromPrompt
}