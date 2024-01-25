import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';
import { History } from './aiChatService';
import templateModel from '../models/templateModel';

const getFilters = async (externalId: string) => {
    const [languages, repositories, technologies] = await Promise.all([
        languageModel.getAll(),
        repositoryModel.getAllByUser(externalId),
        technologyModel.getAll(),
    ]);

    return {
        searchTerm: "",
        languages,
        repositories,
        technologies,
    }
};

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
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number,
    templatesIds: number[],
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

    const templates = await templateModel.getAllByIds(templatesIds);
    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    console.log(templatesIds);
    console.log(templates);

    // Clone
    const history: any = [];
    chatHistory.forEach(h => history.push(h));

    return await promptModel.createOne(
        user.id,
        title,
        textUtils.toSlug(title),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        providerId,
        templates,
        modifiers,
        history
    )
}

const extractModifiersTextsFromPromptId = async (promptId: number): Promise<string[]> => {
    const prompt = await promptModel.getOneById(promptId);

    if (!prompt || !prompt.templates || !prompt.modifiers) return [];

    const templates = JSON.parse(JSON.stringify(prompt.templates));
    const modifiers = JSON.parse(JSON.stringify(prompt.modifiers));
    
    const modifiersTexts: string[] = [];
    const modifiersIdsUsed: number[] = [];

    if (templates.length > 0) {
        templates.forEach((t: any) => {
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
        });

        return modifiersTexts;

    } else if (modifiers.length > 0) {
        return modifiers.map((m: any) => m.content);
    }

    return [];
}

const deletePrompt = async (id: number) => {
    return await promptModel.deleteOne(id);
}

export default {
    getFilters,
    getPrompts,
    getPromptById,
    createPrompt,
    deletePrompt,
    extractModifiersTextsFromPromptId
}