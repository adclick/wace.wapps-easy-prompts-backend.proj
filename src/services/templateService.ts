import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import templateModel from '../models/templateModel';
import textUtils from '../utils/textUtils';
import { History } from './aiChatService';
import modifierModel from '../models/modifierModel';

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

    const modifiers = await modifierModel.getAllByIds(modifiersIds);

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
        modifiers,
    )
}

const deleteTemplate = async (id: number) => {
    return await templateModel.deleteOne(id);
}

const extractModifiersTextsFromTemplatesIds = async (templatesIds: number[]): Promise<string[]> => {
    const templates = await templateModel.getAllByIds(templatesIds);
    
    if (templates.length <= 0) return [];

    const modifiersTexts: string[] = [];
    const modifiersIdsUsed: number[] = [];

    templates.forEach(t => {
        if (t.modifiers) {
            const templateModifiers = JSON.parse(JSON.stringify(t.modifiers));
            
            templateModifiers.forEach((m: any) => {
                if (modifiersIdsUsed.includes(m.id)) {
                    return;
                }

                modifiersIdsUsed.push(m.id);
                modifiersTexts.push(m.content);
            })
        }
    })

    return modifiersTexts;
}

export default {
    getTemplates,
    getTemplateById,
    createTemplate,
    deleteTemplate,
    extractModifiersTextsFromTemplatesIds
}