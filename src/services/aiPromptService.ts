import modifierModel from "../models/modifierModel";
import httpUtils from "../utils/httpUtils";

const BASE_URL = process.env.BASE_URL;

const modify = async (prompt: string, modifiersIds: number[]) => {
    let promptOptimized = prompt;

    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    for (const modifier of modifiers) {
        promptOptimized = await httpUtils.get(`${BASE_URL}/ai/prompt/modify?`, {
            text: promptOptimized,
            modifier: modifier.content,
            type: modifier.type.toLowerCase()
        })
    }

    return promptOptimized;
}

export default {
    modify
}