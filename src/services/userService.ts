import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import slugify from 'slugify';

const login = async (auth0Id: string, email: string) => {
  const user = await userModel.upsertUser(auth0Id, email);

  const repoName = "My Repository";
  const repoSlug = slugify(repoName);
  
  

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