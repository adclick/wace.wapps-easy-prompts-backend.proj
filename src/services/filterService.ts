import languageModel from '../models/languageModel';
import userModel from '../models/userModel';
import technologyModel from '../models/technologyModel';
import craftModel from '../models/promptModel';

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

export default {
    getFilters
}