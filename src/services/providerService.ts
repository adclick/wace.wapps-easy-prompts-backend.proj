import providerModel from "../models/providerModel";

const getDefault = async (technologyId: number) => {
    return await providerModel.getDefault(technologyId);
};

const getProviders = async (technologyId: number) => {
    return await providerModel.getProviders(technologyId);
}

export default {
    getDefault,
    getProviders
}