import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import aiPromptService from './aiPromptService';
import { JsonValue } from '@prisma/client/runtime/library';
import modifierModel from '../models/modifierModel';
import templateModel, { Modifier } from '../models/templateModel';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/generate-text';

interface Settings {
    [key: string]: string
}

const textGeneration = async (text: string, providerId: number, modifiersIds: number[], templatesIds: number[]) => {
    // Validate provider
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error(`Provider (${providerId}) not found`);
    
    let textModified = text;
    
    // Apply modifiers
    const modifiers = await modifierModel.getAllByIds(modifiersIds);
    if (modifiers.length > 0) {
        const modifiersTexts = modifiers.map(m => m.content);

        textModified = await aiPromptService.modifyByModifiers(text, modifiersTexts);
    }
    
    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    // Request
    return await httpUtils.post(API_URL, {
        text: textModified,
        provider: provider.slug,
        settings: JSON.stringify(settings)
    });
};

const textGenerationByPromptId = async (promptId: number) => {
    // Validate Prompt
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);
    
    // Apply modifiers
    let text = prompt.content;
    const metadata = JSON.parse(JSON.stringify(prompt.metadata as JsonValue));
    if (metadata && "modifiers" in metadata) {
        const modifiers = metadata.modifiers;
        const modifiersTexts = modifiers.map((m: any) => m.content);
        text = await aiPromptService.modifyByModifiers(prompt.content, modifiersTexts);
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
        text,
        provider: provider.slug,
        settings: JSON.stringify(settings)
    })
};

export default {
    textGeneration,
    textGenerationByPromptId,
}