import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import aiPromptService from './aiPromptService';
import { JsonValue } from '@prisma/client/runtime/library';
import modifierModel from '../models/modifierModel';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/image/generate-image';

interface Settings {
    [key: string]: string
}

const imageGeneration = async (text: string, providerId: number, providersIds: number[], modifiersIds: number[]) => {
    const settings: Settings = {};

    const provider = await providerModel.getOneById(providerId);

    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    const textModified = await aiPromptService.modifyByModifiers(text, modifiers);

    settings[provider.slug] = provider.model_slug;

    const response = await httpUtils.get(API_URL, {
        text: textModified,
        provider: provider.slug,
        resolution: "512x512",
        num_images: 1,
        settings: JSON.stringify(settings)
    });

    console.log(response);

    return response;
};

const imageGenerationById = async (promptId: number) => {
    const prompt = await promptModel.getOneById(promptId);

    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    let text = prompt.content;

    const metadata = JSON.parse(JSON.stringify(prompt.metadata as JsonValue));
    if (metadata && "modifiers" in metadata) {
        const modifiers = metadata.modifiers;
        text = await aiPromptService.modifyByModifiers(prompt.content, modifiers);
    }

    return await httpUtils.get(API_URL, {
        text,
        provider: prompt.provider.slug,
        resolution: "256x256",
        num_images: 1
    })
};

export default {
    imageGeneration,
    imageGenerationById
}