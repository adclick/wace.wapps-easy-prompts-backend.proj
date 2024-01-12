import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import aiPromptService from './aiPromptService';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/text-generation';

interface Request {
    text: string,
    provider: string
}

const textGeneration = async (
    text: string,
    providerId: number,
    modifiersIds: number[],
    promptId: number
) => {
    if (promptId > 0) {
        const request = await getRequestByPromptId(promptId);
        return await httpUtils.get(API_URL, request);
    }

    const request = await generateRequest(text, providerId, modifiersIds);

    return await httpUtils.get(API_URL, request)
};

const generateRequest = async (
    text: string,
    providerId: number,
    modifiersIds: number[]
): Promise<Request> => {
    const provider = await providerModel.getOneById(providerId);

    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    const textModified = await aiPromptService.modify(text, modifiersIds);

    return {
        text: textModified,
        provider: provider.slug
    }
}

const getRequestByPromptId = async (promptId: number): Promise<Request> => {
    const prompt = await promptModel.getOneById(promptId);

    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    return {
        text: prompt.content,
        provider: prompt.provider.slug
    }
}

export default {
    textGeneration,
}