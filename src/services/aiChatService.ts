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

interface Settings {
    [key: string]: string
}

const chat = async (text: string, providerId: number, providersIds: number[], history: History[]) => {
    const settings: Settings = {};

    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error('Provider not found');

    settings[provider.slug] = provider.model_slug;

    return await httpUtils.post(API_URL, {
        text,
        provider: provider.slug,
        previous_history: history,
        settings: JSON.stringify(settings)
    });
};

const chatById = async (promptId: number) => {
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    const provider = prompt.provider;

    let previous_history = [];

    const metadata = JSON.parse(JSON.stringify(prompt.metadata as JsonValue));
    if (metadata && "history" in metadata) {
        previous_history = metadata.history;
    }

    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    const response = await httpUtils.post(API_URL, {
        text: prompt.content,
        provider: provider.slug,
        previous_history,
        settings
    });

    return {
        response,
        provider,
        technology: prompt.technology
    }
};


export default {
    chat,
    chatById
}