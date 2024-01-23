import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import languageModel from '../models/languageModel';
import modifierModel from '../models/modifierModel';
import textUtils from '../utils/textUtils';

const getFilters = async (externalId: string) => {
    const [languages, repositories] = await Promise.all([
        languageModel.getAll(),
        repositoryModel.getAllByUser(externalId),
    ]);

    return {
        searchTerm: "",
        languages,
        repositories,
    }
};

const getModifiers = async (
    externalId: string,
    searchTerm: string,
    languagesIds: number[],
    repositoriesIds: number[],
) => {
    return await modifierModel.getAll(
        externalId,
        searchTerm,
        languagesIds,
        repositoriesIds,
    );
};

const createModifier = async (
    externalId: string,
    name: string,
    description: string,
    content: string,
    languageId: number,
    repositoryId: number,
    technologyId: number,
    providerId: number
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    const isUserInRepository = await repositoryModel.getOneByUserAndRepository(
        externalId,
        repositoryId
    );

    if (!isUserInRepository) throw new Error('This user does not belong to this repository');

    return await modifierModel.createOne(
        user.id,
        name,
        textUtils.toSlug(name),
        description,
        content,
        languageId,
        repositoryId,
        technologyId,
        providerId,
    )
}

const deleteModifier = async (id: number) => {
    return await modifierModel.deleteOne(id);
}

export default {
    getFilters,
    getModifiers,
    createModifier,
    deleteModifier
}