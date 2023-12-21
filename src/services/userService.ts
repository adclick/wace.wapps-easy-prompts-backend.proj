import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';

const login = async (auth0Id: string, email: string) => {
  const user = await userModel.upsertUser(auth0Id, email);

  // Add user to wace repo (temp)
  const repo = await repositoryModel.getRepositoryBySlug("wace");
  if (repo) {
    await repositoryModel.addUser(repo.id, user.id);
  }

  return user;
};

export default {
  login
}