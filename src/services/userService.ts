import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import slugify from 'slugify';

const login = async (auth0Id: string, email: string) => {
  let user = await userModel.getUser(auth0Id);

  if (!user) {
    throw new Error('User not found');
  }

  user = await userModel.upsertUser(user.id, email, auth0Id);

  const repoName = "My Repository";
  const repoSlug = slugify(repoName);
  await repositoryModel.upsertRepository(repoName, repoSlug, user.id);


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