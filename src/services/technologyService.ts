import technologyModel from "../models/technologyModel";

const getTechnologies = async () => {
    return await technologyModel.getTechnologies();
};

const getDefault = async () => {
    return await technologyModel.getDefault();
};

export default {
    getTechnologies,
    getDefault,
}