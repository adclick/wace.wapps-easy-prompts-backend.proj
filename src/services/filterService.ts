import repositoryModel from '../models/repositoryModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';

const getAll = async (externalId: string) => {
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

export default {
    getAll,
}