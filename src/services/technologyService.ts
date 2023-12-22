import technologyModel from "../models/technologyModel";

const getDefault = async () => {
    return await technologyModel.getDefaultTechnology();
};

export default {
    getDefault,
}