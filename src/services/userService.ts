import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import slugify from 'slugify';
import userRepositoryModel from '../models/userRepositoryModel';

const login = async (email: string, username: string, externalId: string) => {
    // Create or update user
    const user = await userModel.upsertOne(email, username, externalId);

    // Create or update main personal repo
    const repoName = "My Repository";
    const repoSlug = slugify(repoName, {lower: true});
    await repositoryModel.upsertOne(repoName, repoSlug, user.id);

    // Subscribe user to wace repo (temp)
    const repo = await repositoryModel.getOneBySlug("wace");
    if (!repo) {
        throw new Error(`Repository 'wace' not found`);
    }
    await userRepositoryModel.upsertOne(repo.id, user.id);

    return user;
};

export default {
    login
}