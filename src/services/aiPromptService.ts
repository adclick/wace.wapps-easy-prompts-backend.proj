import { Modifier } from "../models/modifierModel";
import httpUtils from "../utils/httpUtils";

const BASE_URL = process.env.BASE_URL;

const modifyByModifiers = async (prompt: string, modifiers: Modifier[]) => {
    let promptOptimized = prompt;

    for (const modifier of modifiers) {
        promptOptimized = await httpUtils.get(`${BASE_URL}/ai/prompt/modify`, {
            text: promptOptimized,
            modifier: modifier.content,
            type: modifier.type.toLowerCase()
        });
    }

    return promptOptimized;
}

export default {
    modifyByModifiers
}