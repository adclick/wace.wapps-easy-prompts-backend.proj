import repository from '../models/repository';

const getFilters = async (userId: string) => {
  const repositories = await repository.getUserRepositories(userId);

  return {
    repositories
  }
};

export default {
  getFilters
}