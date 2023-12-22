import parameterModel from "../models/parameterModel";
import providerModel from "../models/providerModel";
import technologyModel from "../models/technologyModel";

const getOptions = async (userId: string) => {
    const technology = await technologyModel.getDefaultTechnology();
    if (!technology) {
        throw new Error('No default Technology')
    }
    
    const provider = await providerModel.getDefaultProviderByTechnologyId(technology.id);
    if (!technology) {
        throw new Error('No default Provider')
    }

    return {
        prompt: "",
        technology,
        provider
    }
};

const getProvider = async (technologyId: number) => {
    return await providerModel.getDefaultProviderByTechnologyId(technologyId);
};

const getParameters = async (technologyId: number, providerId: number) => {
    return await parameterModel.getParameters(technologyId, providerId);
}

export default {
    getOptions,
    getProvider,
    getParameters
}