import repositoryModel from '../models/repositoryModel';
import languageModel from '../models/languageModel';
import technologyModel from '../models/technologyModel';
import craftModel from '../models/craftModel';

const getFilters = async (userId: string) => {
  const languages = languageModel.getLanguages();
  const repositories = repositoryModel.getUserRepositories(userId);
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