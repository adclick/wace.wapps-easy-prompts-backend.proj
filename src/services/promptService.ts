import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';

const getFilters = async (externalId: string) => {
    const languages = languageModel.getLanguages();
    const repositories = userModel.getRepositories(externalId);
    const technologies = technologyModel.getTechnologies();

    return Promise.all([languages, repositories, technologies]).then(values => {
        const [languages, repositories, technologies] = values;

        return {
            searchTerm: "",
            languages,
            repositories,
            technologies,
        }
    })
};

const getPrompts = async (
    externalId: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
    technologies_ids: number[],
) => {
    return await promptModel.getPrompts(
        externalId,
        search_term,
        languages_ids,
        repositories_ids,
        technologies_ids,
    );
};

const createPrompt = async (
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number,
    modifiersIds: string[]
) => {
    const user = await userModel.getUser(externalId);
    if (!user) {
        throw new Error("User not found");
    }

    const isUserInRepository = await repositoryModel.isUserInRepository(externalId, repositoryId);
    if (!isUserInRepository) {
        throw new Error('This user does not belong to this repository');
    }

    const modifiers = await modifierModel.getModifiersInIds(modifiersIds.map(id => parseInt(id)));
    const metadata = { modifiers };

    return await promptModel.createPrompt(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        providerId,
        metadata
    )
}

const deletePrompt = async (id: number) => {
    return await promptModel.deletePrompt(id);
}

export default {
    getFilters,
    getPrompts,
    createPrompt,
    deletePrompt
}