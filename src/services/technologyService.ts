import providerModel from "../models/providerModel";
import technologyModel from "../models/technologyModel";

const getDefault = async () => {
    return await technologyModel.getDefaultTechnology();
};

const getProvidersByTechnologyId = async (technologyId: number) => {
    return await providerModel.getProvidersByTechnologyId(technologyId);
}

export default {
    getDefault,
    getProvidersByTechnologyId
}