import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import aiPromptService from './aiPromptService';
import templateService from './templateService';
import modifierService from './modifierService';
import promptService from './promptService';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/image/generate-image';

interface Settings {
    [key: string]: string
}

const imageGeneration = async (text: string, providerId: number, modifiersIds: number[], templatesIds: number[]) => {
    // Validate provider
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    let textModified = text;
    let modifiersTexts: string[] = [];
    
    // Extract modifiers
    if (templatesIds.length > 0) {
        modifiersTexts = await templateService.extractModifiersTextsFromTemplatesIds(templatesIds);
    } else if (modifiersIds.length > 0) {
        modifiersTexts = await modifierService.extractModifiersTextsFromModifiersIds(modifiersIds);
    }
    
    // Apply modifiers
    if (modifiersTexts.length > 0) {
        textModified = await aiPromptService.modifyByModifiers(text, modifiersTexts);
    }

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    // Request
    return await httpUtils.get(API_URL, {
        text: textModified,
        provider: provider.slug,
        resolution: "512x512",
        num_images: 1,
        settings: JSON.stringify(settings)
    });
};

const imageGenerationByPromptId = async (promptId: number) => {
    // Validate Prompt
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    let textModified = prompt.content;

    // Extract modifiers
    const modifiersTexts = await promptService.extractModifiersTextsFromPromptId(prompt.id);

    // Apply modifiers
    if (modifiersTexts.length > 0) {
        textModified = await aiPromptService.modifyByModifiers(prompt.content, modifiersTexts);
    }

    // Apply provider model
    const settings: Settings = {};
    let provider = prompt.provider;
    if (!provider) {
        provider = await providerModel.getOneDefaultByTechnologyId(prompt.technology_id);
        if (!provider) throw new Error('No providers found');
    }
    settings[provider.slug] = provider.model_slug;

    // Request
    return await httpUtils.get(API_URL, {
        text: textModified,
        provider: provider.slug,
        resolution: "512x512",
        num_images: 1
    })
};

export default {
    imageGeneration,
    imageGenerationByPromptId,
}