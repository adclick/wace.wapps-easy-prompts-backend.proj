import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import slugify from 'slugify';

const login = async (email: string, externalId: string) => {
  // Create or update user
  const user = await userModel.upsertUser(email, externalId);

  // Create or update main personal repo
  const repoName = "My Repository";
  const repoSlug = slugify(repoName);
  await repositoryModel.upsertRepository(repoName, repoSlug, user.id);

  // Subscribe user to wace repo (temp)
  const repo = await repositoryModel.getRepositoryBySlug("wace");
  if (!repo) {
    throw new Error(`Repository 'wace' not found`);
  }
  await repositoryModel.subscribeUser(repo.id, user.id);

  return user;
};

export default {
  login
}