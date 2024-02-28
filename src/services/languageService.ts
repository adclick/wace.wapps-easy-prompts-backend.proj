import languageModel from "../models/languageModel";

const getIdsFromUUIDs = async (uuids: string[]) => {
    const languages = await languageModel.getAllByUUIDs(uuids);

    return languages.map(l => l.id);
}

export default {
    getIdsFromUUIDs
}