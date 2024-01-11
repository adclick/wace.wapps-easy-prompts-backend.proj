import providerModel from "../models/providerModel";

const getDefault = async (technologyId: number) => {
    return await providerModel.getOneDefaultByTechnologyId(technologyId);
};

const getProviders = async (technologyId: number) => {
    return await providerModel.getAll(technologyId);
}

export default {
    getDefault,
    getProviders
}