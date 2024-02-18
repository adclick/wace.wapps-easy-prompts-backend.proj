import threadModel from "../models/threadModel"
import userModel from "../models/userModel";

const getAllThreadsByWorkspace = async (workspace_id: number) => {
    return await threadModel.getAllByWorkspace(workspace_id);
}

const createOneThread = async (
    title: string,
    externalId: string,
    prompt_id: number,
    workspace_id: number,
    response: string
) => {
    const user = await userModel.getOneById(externalId);
    if (!user) throw new Error("User not found");

    return await threadModel.createOne(
        title,
        user.id,
        prompt_id,
        workspace_id,
        response,
    )
}

export default {
    getAllThreadsByWorkspace,
    createOneThread
}