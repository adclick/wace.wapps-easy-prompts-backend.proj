import httpUtils from "../utils/httpUtils";

const BASE_URL = process.env.BASE_URL;

const modifyByModifiers = async (prompt: string, modifiers: string[]) => {
    let promptOptimized = prompt;

    promptOptimized = await httpUtils.get(`${BASE_URL}/ai/prompt/modify`, {
        text: promptOptimized,
        modifiers: JSON.stringify(modifiers),
        language: "en"
    });

    return promptOptimized;
}

export default {
    modifyByModifiers
}