import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import templateModel from '../models/templateModel';
import textUtils from '../utils/textUtils';
import { History } from './aiChatService';
import promptUtils from '../utils/promptUtils';
import { PromptChatMessage } from '../models/promptChatMessageModel';
import { TemplateParameter } from '../models/templateParameter';

const getTemplates = async (
    externalId: string,
    searchTerm: string,
    languagesIds: number[],
    repositoriesIds: number[],
    technologiesIds: number[],
    limit: number,
    offset: number
) => {
    return await templateModel.getAll(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
        technologiesIds,
        limit,
        offset
    );
};

const getTemplateById = async (promptId: number) => {
    return await templateModel.getOneById(promptId);
};

const createTemplate = async (
    externalId: string,
    name: string,
    description: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number,
    modifiersIds: number[],
    chatHistory: History[],
    templateParameters: TemplateParameter[]
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
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
        languageId,
        repositoryId,
        technologyId,
        providerId,
        modifiersIds,
        templateParameters
    )
}

const updateTemplate = async (
    id: number,
    externalId: string,
    name: string,
    description: string,
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

    return await templateModel.updateOne(
        id,
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        languageId,
        repositoryId,
        technologyId,
        providerId,
    )
}

const deleteTemplate = async (id: number) => {
    return await templateModel.deleteOne(id);
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

    if (templates.length <= 0) return { textModified: text, chatMessagesModified : chatMessages };

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
    getTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    applyTemplatesToText,
    applyTemplatesToChat
}