import languageModel from '../models/languageModel';
import userModel from '../models/userModel';
import technologyModel from '../models/technologyModel';
import craftModel from '../models/craftModel';

const getFilters = async (externalId: string) => {
  const languages = languageModel.getLanguages();
  const repositories = userModel.getRepositories(externalId);
  const technologies = technologyModel.getTechnologies();
  const crafts = craftModel.getTypes();

  return Promise.all([languages, repositories, technologies, crafts]).then(values => {
    const [languages, repositories, technologies, crafts] = values;

    return {
      searchTerm: "",
      languages,
      repositories,
      technologies,
      crafts
    }
  })
};

export default {
  getFilters
}