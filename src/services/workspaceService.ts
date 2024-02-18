import workspaceModel from "../models/workspaceModel"

const getOneWorkspaceByUser = async (external_id: string) => {
    return await workspaceModel.getOneByUser(external_id);
}

export default {
    getOneWorkspaceByUser
}