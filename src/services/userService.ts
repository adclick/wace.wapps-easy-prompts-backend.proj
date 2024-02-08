import repositoryModel from '../models/repositoryModel';
import userModel from '../models/userModel';
import userRepositoryModel from '../models/userRepositoryModel';
import textUtils from '../utils/textUtils';

const login = async (email: string, username: string, externalId: string) => {
    // Create or update user
    const user = await userModel.upsertOne(email, username, externalId);
    // let user = await userModel.getOneByEmailAndExternalId(email, externalId);

    // if (!user) {
    //     console.log("update");
    //     user = await userModel.insertOne(externalId, email, username);
    // }

    upsertUserToRepositories(email, user.id);

    return user;
};

const upsertUserToRepositories = async (email: string, userId: number) => {
    // Create or update main personal repo
    const repoName = "My Repository";
    const repoSlug = textUtils.toSlug(repoName);
    await repositoryModel.upsertOne(repoName, repoSlug, userId);

    // HARDCODE
    // Subscribe user to specific repos
    if (email.endsWith('wacestudio.com')) {
        if (email === 'nuno.saraiva@wacestudio.com' || email === 'sergio.cunha@wacestudio.com') {
            const repoWaceId = await repositoryModel.getOneBySlug("wace-it");
            if (!repoWaceId) throw new Error(`Repository 'wace-it' not found`);
            await userRepositoryModel.upsertOne(repoWaceId.id, userId);
        }

        const repoWace = await repositoryModel.getOneBySlug("wace");
        if (!repoWace) throw new Error(`Repository 'wace' not found`);
        await userRepositoryModel.upsertOne(repoWace.id, userId);
    }

    if (email.endsWith('adclick.pt')) {
        const repoAdclick = await repositoryModel.getOneBySlug("adclick");
        if (!repoAdclick) throw new Error(`Repository 'adclick' not found`);
        await userRepositoryModel.upsertOne(repoAdclick.id, userId);
    }
}

export default {
    login
}