import axios from 'axios';
import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import modifierModel from '../models/modifierModel';

const BASE_URL = process.env.BASE_URL;

export interface Thread {
    request: string,
    response: string
}

interface PreviousHistory {
    role: string,
    message: string
}

const modifyText = async (text: string, modifiersIds: string[]) => {
    let prompt = text;

    for (const modifierId of modifiersIds) {
        const modifier = await modifierModel.getModifier(parseInt(modifierId));

        if (!modifier) continue;

        const { data } = await axios.get(`${BASE_URL}/ai/prompt/modify?` + new URLSearchParams({
            text: prompt,
            modifier: modifier.content,
            type: modifier.type.toLowerCase()
        }));

        if (data) {
            prompt = data;
        }
    }

    return prompt;
}

const textGeneration = async (
    text: string,
    providerId: number,
    modifiersIds: string[],
    promptId: number
) => {
    console.log(promptId);
    const prompt = await promptModel.getPrompt(promptId);
    let providerSlug = "";
    if (prompt) {
        text = prompt.content;
        providerSlug = prompt.provider.slug;
    } else {
        const provider = await providerModel.getById(providerId);
        if (!provider) throw new Error('Provider not found');
        providerSlug = provider.slug;
    }

    const modifiedText = await modifyText(text, modifiersIds);

    const url = `${BASE_URL}/ai/text/generate-text?` + new URLSearchParams({
        text: modifiedText,
        provider: providerSlug
    });

    console.log(url);

    const { data } = await axios.get(url);

    return data;
};

const imageGeneration = async (text: string, providerId: number) => {
    const provider = await providerModel.getById(providerId);
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

    const prompt = await promptModel.getPrompt(promptId);
    if (prompt) {
        text = prompt.content;
        provider = prompt.provider.slug;
        previous_history = JSON.parse(JSON.stringify(prompt.metadata)).requests
    } else {
        const providerObject = await providerModel.getById(providerId);
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
    textGeneration,
    imageGeneration
}