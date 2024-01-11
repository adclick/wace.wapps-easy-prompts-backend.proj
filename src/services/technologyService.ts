import technologyModel from "../models/technologyModel";

const getTechnologies = async () => {
    return await technologyModel.getAll();
};

const getDefault = async () => {
    return await technologyModel.getOneDefault();
};

export default {
    getTechnologies,
    getDefault,
}