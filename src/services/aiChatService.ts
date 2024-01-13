import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import { JsonValue } from '@prisma/client/runtime/library';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/chat';

export interface History {
    role: string,
    message: string
}

const chat = async (text: string, providerId: number, history: History[]) => {
    let provider = "";

    const providerObject = await providerModel.getOneById(providerId);
    if (!providerObject) throw new Error('Provider not found');
    provider = providerObject.slug;

    return await httpUtils.post(API_URL, {
        text,
        provider,
        previous_history: history
    });
};

const chatById = async (promptId: number) => {
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    const text = prompt.content;
    const provider = prompt.provider.slug;
    let previous_history = [];

    const metadata = JSON.parse(JSON.stringify(prompt.metadata as JsonValue));
    if (metadata && "history" in metadata) {
        previous_history = metadata.history;
    }

    return await httpUtils.post(API_URL, {
        text,
        provider,
        previous_history
    });
};


export default {
    chat,
    chatById
}