import repositoryModel from "../models/repositoryModel";

const getIdsFromUUIDs = async (uuids: string[]) => {
    const repositories = await repositoryModel.getAllByUUIDs(uuids);

    return repositories.map(r => r.id);
}

export default {
    getIdsFromUUIDs
}