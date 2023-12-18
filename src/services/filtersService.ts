import repository from '../models/repository';
import language from '../models/language';
import technology from '../models/technology';

const getFilters = async (userId: string) => {
  const repositories = await repository.getUserRepositories(userId);
  const languages = await language.getLanguages();
  const technologies = await technology.getTechnologies();

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