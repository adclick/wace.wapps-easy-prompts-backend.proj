import axios from 'axios';
import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import modifierModel from '../models/modifierModel';
import httpUtils from '../utils/httpUtils';

const BASE_URL = process.env.BASE_URL;

export interface Thread {
    request: string,
    response: string
}

interface PreviousHistory {
    role: string,
    message: string
}

const modifyText = async (text: string, modifiersIds: number[]) => {
    let textOptimized = text;

    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    for (const modifier of modifiers) {
        textOptimized = await httpUtils.get(`${BASE_URL}/ai/prompt/modify?`, {
            text: textOptimized,
            modifier: modifier.content,
            type: modifier.type.toLowerCase()
        })
    }

    return textOptimized;
}


const imageGeneration = async (text: string, providerId: number) => {
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error('Provider not found');

    const url = `${BASE_URL}/ai/image/generate-image?` + new URLSearchParams({
        text,
        provider: provider.slug,
        num_images: "1",
        resolution: "256x256",
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
}

const chat = async (text: string, providerId: number, threads: Thread[], promptId: number) => {
    let previous_history: PreviousHistory[] = [];
    let provider = "";

    const prompt = await promptModel.getOneById(promptId);
    if (prompt) {
        text = prompt.content;
        provider = prompt.provider.slug;
        previous_history = JSON.parse(JSON.stringify(prompt.metadata)).requests
    } else {
        const providerObject = await providerModel.getOneById(providerId);
        if (!providerObject) throw new Error('Provider not found');
        provider = providerObject.slug;

        threads.forEach(t => {
            previous_history.push({ role: "user", message: t.request });
            previous_history.push({ role: "assistant", message: t.response });
        });
    }

    const { data } = await axios.post(`${BASE_URL}/ai/text/chat`, { text, provider, previous_history });

    return data;
};


export default {
    chat,
    imageGeneration
}