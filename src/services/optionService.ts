import parameterModel from "../models/parameterModel";
import providerModel from "../models/providerModel";

const getProvider = async (technologyId: number) => {
    return await providerModel.getDefaultProviderByTechnologyId(technologyId);
};

const getParameters = async (technologyId: number, providerId: number) => {
    return await parameterModel.getParameters(technologyId, providerId);
}

export default {
    getProvider,
    getParameters
}