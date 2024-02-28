import BadRequestError from "../errors/BadRequestError";
import providerModel from "../models/providerModel";
import technologyModel from "../models/technologyModel";

const getDefault = async (technologyUUID: string) => {
    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({message: `Technology "${technologyUUID}" not found`});

    return await providerModel.getOneDefaultByTechnologyId(technology.id);
};

const getProviders = async (technologyUUID: string) => {
    const technology = await technologyModel.getOneByUUID(technologyUUID);
    if (!technology) throw new BadRequestError({message: `Technology "${technologyUUID}" not found`});
    
    return await providerModel.getAll(technology.id);
}

export default {
    getDefault,
    getProviders
}