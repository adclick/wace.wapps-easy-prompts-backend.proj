import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';
import modeModel from '../models/modeModel';

const getFilters = async (externalId: string) => {
    const [languages, repositories, technologies, modes] = await Promise.all([
        languageModel.getAll(),
        repositoryModel.getAllByUser(externalId),
        technologyModel.getAll(),
        modeModel.getAll(),
    ]);

    return {
        searchTerm: "",
        languages,
        repositories,
        technologies,
        modes,
    }
};

const getPrompts = async (
    externalId: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
    modes_ids: number[],
) => {
    return await promptModel.getAll(
        externalId,
        search_term,
        languages_ids,
        repositories_ids,
        technologies_ids,
        modes_ids,
    );
};

const createPrompt = async (
    externalId: string,
    title: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    modeId: number,
    providerId: number,
    modifiersIds: number[]
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );
    
    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    const modifiers = await modifierModel.getAllByIds(modifiersIds);
    const metadata = { modifiers };

    return await promptModel.createOne(
        user.id,
        title,
        textUtils.toSlug(title),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        modeId,
        providerId,
        metadata
    )
}

const deletePrompt = async (id: number) => {
    return await promptModel.deleteOne(id);
}

export default {
    getFilters,
    getPrompts,
    createPrompt,
    deletePrompt
}