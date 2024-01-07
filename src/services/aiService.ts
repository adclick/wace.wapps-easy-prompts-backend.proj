import axios from 'axios';
import providerModel from '../models/providerModel';
import craftModel from '../models/promptModel';
import promptModel from '../models/promptModel';
import { JsonArray, JsonObject } from '@prisma/client/runtime/library';

export interface Thread {
    request: string,
    response: string
}

interface PreviousHistory {
    role: string,
    message: string
}

const textGeneration = async (
    text: string,
    providerId: number,
    craftId: number
) => {
    const provider = await providerModel.getById(providerId);
    if (!provider) throw new Error('Provider not found');

    const url = "https://easyprompts.wacestudio.pt/ai/text/generate-text?" + new URLSearchParams({
        text,
        provider: provider.slug,
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
};

const imageGeneration = async (
    text: string,
    providerId: number,
    parameters: { slug: string, value: string }[],
) => {
    const provider = await providerModel.getById(providerId);
    if (!provider) throw new Error('Provider not found');

    let numImagesParameter = parameters.find(p => p.slug === 'num_images');
    let resolutionParameter = parameters.find(p => p.slug === 'resolution');

    const url = "https://easyprompts.wacestudio.pt/ai/image/generate-image?" + new URLSearchParams({
        text,
        provider: provider.slug,
        num_images: numImagesParameter !== undefined ? numImagesParameter.value : "1",
        resolution: resolutionParameter !== undefined ? resolutionParameter.value : "256x256",
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
}

const chat = async (text: string, providerId: number, threads: Thread[], promptId: number) => {
    if (promptId > 0) {
        const prompt = await promptModel.getPrompt(promptId);
        if (prompt) {
            text = prompt.content;
            const provider = prompt.provider.slug;
            const metadata = prompt.metadata;
            console.log(metadata);
        }
    }

    const provider = await providerModel.getById(providerId);
    if (!provider) throw new Error('Provider not found');

    const previous_history: PreviousHistory[] = [];
    threads.forEach(t => {
        previous_history.push({ role: "user", message: t.request });
        previous_history.push({ role: "assistant", message: t.response });
    });

    const { data } = await axios.post("https://easyprompts.wacestudio.pt/ai/text/chat", {
        text,
        provider: provider.slug,
        previous_history
    });

    return data;
};


export default {
    chat,
    textGeneration,
    imageGeneration
}