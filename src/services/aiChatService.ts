import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import { JsonValue } from '@prisma/client/runtime/library';
import modifierModel from '../models/modifierModel';
import aiPromptService from './aiPromptService';
import templateModel from '../models/templateModel';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/chat';

export interface History {
    role: string,
    message: string
}

interface Settings {
    [key: string]: string
}

const chat = async (text: string, providerId: number, providersIds: number[], history: History[], modifiersIds: number[]) => {
    // Validate provider
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    // Apply modifiers
    const modifiers = await modifierModel.getAllByIds(modifiersIds);
    let textModified = text;
    if (modifiers.length > 0) {
        const modifiersTexts = modifiers.map(m => m.content);
        
        textModified = await aiPromptService.modifyByModifiers(text, modifiersTexts);
    }


    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    return await httpUtils.post(API_URL, {
        text: textModified,
        provider: provider.slug,
        previous_history: history,
        settings: JSON.stringify(settings)
    });
};

const chatByPromptId = async (promptId: number) => {
    // Validate Prompt
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    // Apply modifiers and history
    let text = prompt.content;
    let previous_history = [];
    const metadata = JSON.parse(JSON.stringify(prompt.metadata as JsonValue));
    if (metadata && "modifiers" in metadata) {
        const modifiers = metadata.modifiers;
        const modifiersTexts = modifiers.map((m: any) => m.content);
        text = await aiPromptService.modifyByModifiers(prompt.content, modifiersTexts);
    }
    if (metadata && "history" in metadata) {
        previous_history = metadata.history;
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
    const response = await httpUtils.post(API_URL, {
        text: prompt.content,
        provider: provider.slug,
        previous_history,
        settings
    });

    return {
        response,
        provider: prompt.provider,
        technology: prompt.technology,
        user: prompt.user
    }
};


export default {
    chat,
    chatByPromptId,
}