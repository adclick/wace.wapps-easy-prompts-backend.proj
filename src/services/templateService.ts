import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import templateModel from '../models/templateModel';
import textUtils from '../utils/textUtils';
import promptUtils from '../utils/promptUtils';
import { PromptChatMessage } from '../models/promptChatMessageModel';
import { TemplateParameter } from '../models/templateParameter';
import languageService from './languageService';
import repositoryService from './repositoryService';
import technologyService from './technologyService';
import BadRequestError from '../errors/BadRequestError';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import providerModel from '../models/providerModel';
import modifierService from './modifierService';

const getIdsFromUUIDs = async (uuids: string[]) => {
    const templates = await templateModel.getAllByUUIDs(uuids);

    return templates.map(t => t.id);
}

const getTemplates = async (
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

    return await templateModel.getAllByFilters(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
        technologiesIds,
        limit,
        offset
    );
};

const getAllTemplates = async (externalId: string) => {
    return await templateModel.getAllByUser(
        externalId,
    );
};

const getTemplateById = async (templateUUID: string) => {
    const template = await templateModel.getOneByUUID(templateUUID);

    if (!template) throw new BadRequestError({ message: `Template "${templateUUID}" not found` });
    
    return await templateModel.getOneById(template.id);
};

const createTemplate = async (
    externalId: string,
    name: string,
    description: string,
    languageUUID: string,
    repositoryUUID: string,
    technologyUUID: string,
    providerUUID: string,
    modifiersUUIDs: string[],
    templateParameters: TemplateParameter[]
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const language = await languageModel.getOneByUUID(languageUUID);
    if (!language) throw new BadRequestError({ message: `Language "${languageUUID}" not found` });

    const repository = await repositoryModel.getOneByUUID(repositoryUUID);
    if (!repository) throw new BadRequestError({ message: `Repository "${repositoryUUID}" not found` });

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new BadRequestError({ message: `Provider "${providerUUID}" not found` });

    const modifiersIds = await modifierService.getIdsFromUUIDs(modifiersUUIDs);


    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repository.id
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    // Clone
    // const history: any = [];
    // chatHistory.forEach(h => history.push(h));

    return await templateModel.createOne(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        language.id,
        repository.id,
        technology.id,
        provider.id,
        modifiersIds,
        templateParameters
    )
}

const updateTemplate = async (
    uuid: string,
    externalId: string,
    name: string,
    description: string,
    languageUUID: string,
    repositoryUUID: string,
    technologyUUID: string,
    providerUUID: string,
    modifiersUUIDs: string[],
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const template = await templateModel.getOneByUUID(uuid);
    if (!template) throw new BadRequestError({ message: `Template "${uuid}" not found` });

    const language = await languageModel.getOneByUUID(languageUUID);
    if (!language) throw new BadRequestError({ message: `Language "${languageUUID}" not found` });

    const repository = await repositoryModel.getOneByUUID(repositoryUUID);
    if (!repository) throw new BadRequestError({ message: `Repository "${repositoryUUID}" not found` });

    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({ message: `Technology "${technologyUUID}" not found` });

    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new BadRequestError({ message: `Provider "${providerUUID}" not found` });

    const modifiersIds = await modifierService.getIdsFromUUIDs(modifiersUUIDs);

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repository.id
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await templateModel.updateOne(
        template.id,
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        language.id,
        repository.id,
        technology.id,
        provider.id,
        modifiersIds,
    )
}

const deleteTemplate = async (uuid: string) => {
    const template = await templateModel.getOneByUUID(uuid);
    if (!template) throw new BadRequestError({ message: `Template "${uuid}" not found` });

    return await templateModel.deleteOne(template.id);
}

const applyTemplatesToText = async (text: string, templatesIds: number[]): Promise<string> => {
    const templates = await templateModel.getAllByIds(templatesIds);

    if (templates.length <= 0) return text;

    // Apply language from first selected template
    const languageSlug = templates[0].language.slug;

    const modifiersIds: number[] = [];
    const modifiersTexts: string[] = [];

    // Extract all modifiers texts
    templates.forEach(t => {
        if (!t.templates_modifiers) {
            return;
        }

        t.templates_modifiers.map(templateModifier => {
            const modifier = templateModifier.modifier;

            if (modifiersIds.includes(modifier.id)) {
                return;
            }

            modifiersIds.push(modifier.id);
            modifiersTexts.push(modifier.content);
        })
    });

    return promptUtils.optimizeText(text, modifiersTexts, languageSlug);
}

const applyTemplatesToChat = async (
    text: string,
    templatesIds: number[],
    chatMessages: PromptChatMessage[]
): Promise<{ textModified: string, chatMessagesModified: PromptChatMessage[] }> => {
    const templates = await templateModel.getAllByIds(templatesIds);

    if (templates.length <= 0) return { textModified: text, chatMessagesModified: chatMessages };

    // Apply language from first selected template
    const languageSlug = templates[0].language.slug;

    const modifiersIds: number[] = [];
    const modifiersTexts: string[] = [];

    // Extract all modifiers texts
    templates.forEach(t => {
        if (!t.templates_modifiers) {
            return;
        }

        t.templates_modifiers.map(templateModifier => {
            const modifier = templateModifier.modifier;

            if (modifiersIds.includes(modifier.id)) {
                return;
            }

            modifiersIds.push(modifier.id);
            modifiersTexts.push(modifier.content);
        })
    });

    return promptUtils.optimizeChat(text, modifiersTexts, chatMessages, languageSlug);
}

export default {
    getIdsFromUUIDs,
    getTemplates,
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    applyTemplatesToText,
    applyTemplatesToChat
}