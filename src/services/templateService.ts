import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import templateModel from '../models/templateModel';
import textUtils from '../utils/textUtils';
import { History } from './aiChatService';
import promptUtils from '../utils/promptUtils';

const getTemplates = async (
    externalId: string,
    searchTerm: string,
    languagesIds: number[],
    repositoriesIds: number[],
    limit: number,
    offset: number
) => {
    return await templateModel.getAll(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
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
    chatHistory: History[]
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

const applyTemplatesToChat = async (text: string, templatesIds: number[], history: History[]): Promise<{ textModified: string, historyModified: History[] }> => {
    const templates = await templateModel.getAllByIds(templatesIds);

    if (templates.length <= 0) return {textModified: text, historyModified: history};

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

    return promptUtils.optimizeChat(text, modifiersTexts, history, languageSlug);
}

export default {
    getTemplates,
    getTemplateById,
    createTemplate,
    deleteTemplate,
    applyTemplatesToText
}