import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import promptModel from '../models/promptModel';
import languageModel from '../models/languageModel';
import templateModel from '../models/templateModel';
import textUtils from '../utils/textUtils';
import technologyModel from '../models/technologyModel';

const getFilters = async (externalId: string) => {
    const [languages, repositories, technologies] = await Promise.all([
        languageModel.getAll(),
        repositoryModel.getAllByUser(externalId),
        technologyModel.getAll()
    ]);

    return {
        searchTerm: "",
        languages,
        repositories,
        technologies
    }
};

const getTemplates = async (
    externalId: string,
    searchTerm: string,
    languagesIds: number[],
    repositoriesIds: number[],
) => {
    return await templateModel.getAll(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
    );
};

const createTemplate = async (
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await templateModel.createOne(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        languageId,
        repositoryId,
    )
}

const deleteTemplate = async (id: number) => {
    return await templateModel.deleteOne(id);
}

export default {
    getFilters,
    getTemplates,
    createTemplate,
    deleteTemplate
}