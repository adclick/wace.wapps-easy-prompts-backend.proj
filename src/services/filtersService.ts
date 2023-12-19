import repository from '../models/repository';
import language from '../models/language';
import technology from '../models/technology';

const getFilters = async (userId: string) => {
  const repositories = repository.getUserRepositories(userId);
  const languages = language.getLanguages();
  const technologies = technology.getTechnologies();

  Promise.all([repositories, languages, technologies]).then(values => {
  })

  return {
    searchTerm: "",
    technologies,
    repositories,
    languages,
    types: ["prompts", "templates", "modifiers"]
  }
};

export default {
  getFilters
}