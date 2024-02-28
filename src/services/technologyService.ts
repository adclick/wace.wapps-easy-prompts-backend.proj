import technologyModel from "../models/technologyModel";

const getIdsFromUUIDs = async (uuids: string[]) => {
    const technologies = await technologyModel.getAllByUUIDs(uuids);

    return technologies.map(t => t.id);
}

const getTechnologies = async () => {
    return await technologyModel.getAll();
};

const getDefault = async () => {
    return await technologyModel.getOneDefault();
};

export default {
    getIdsFromUUIDs,
    getTechnologies,
    getDefault,
}