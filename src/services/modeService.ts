import modeModel from "../models/modeModel";

const getModes = async () => {
    return await modeModel.getAll();
};

const getDefault = async () => {
    return await modeModel.getOneDefault();
};

export default {
    getModes,
    getDefault,
}