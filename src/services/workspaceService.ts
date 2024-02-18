import workspaceModel from "../models/workspaceModel"

const getAllWorkspacesByUser = async (external_id: string) => {
    return await workspaceModel.getAllByUser(external_id);
}

export default {
    getAllWorkspacesByUser
}