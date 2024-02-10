import repositoryModel from '../models/repositoryModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import BadRequestError from '../errors/BadRequestError';

const getAll = async (externalId: string) => {
    if (!externalId) throw new BadRequestError({message: 'Invalid User'});

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

const getAllUserPrivateFilters = async (externalId: string) => {
    if (!externalId) throw new BadRequestError({message: 'Invalid User'});

    const [languages, repositories, technologies] = await Promise.all([
        languageModel.getAll(),
        repositoryModel.getAllCreatedByUser(externalId),
        technologyModel.getAll(),
    ]);

    return {
        searchTerm: "",
        languages,
        repositories,
        technologies,
    }
};
const getAllUserPublicDatabaseFilters = async (externalId: string) => {
    if (!externalId) throw new BadRequestError({message: 'Invalid User'});

    const [languages, repositories, technologies] = await Promise.all([
        languageModel.getAll(),
        repositoryModel.getAllSubscribedByUser(externalId),
        technologyModel.getAll(),
    ]);

    return {
        searchTerm: "",
        languages,
        repositories,
        technologies,
    }
};


export default {
    getAll,
    getAllUserPrivateFilters,
    getAllUserPublicDatabaseFilters
}