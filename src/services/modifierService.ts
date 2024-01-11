import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';

const getFilters = async (externalId: string) => {
    const languages = languageModel.getAll();
    const repositories = repositoryModel.getAllByUser(externalId);
    const technologies = technologyModel.getAll();

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

const getModifiers = async (
    externalId: string,
    search_term: string,
    languages_ids: number[],
    repositories_ids: number[],
) => {
    return await modifierModel.getAll(
        externalId,
        search_term,
        languages_ids,
        repositories_ids,
    );
};

const createModifier = async (
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) {
        throw new Error("User not found");
    }

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(externalId, repositoryId);
    if (!isUserInRepository) {
        throw new Error('This user does not belong to this repository');
    }

    return await modifierModel.createOne(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        languageId,
        repositoryId,
    )
}

const deleteModifier = async (id: number) => {
    return await promptModel.deleteOne(id);
}

export default {
    getFilters,
    getModifiers,
    createModifier,
    deleteModifier
}