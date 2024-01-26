import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import aiPromptService from './aiPromptService';
import templateService from './templateService';
import modifierService from './modifierService';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/chat';

export interface History {
    role: string,
    message: string
}

interface Settings {
    [key: string]: string
}

const chat = async (text: string, providerId: number, history: History[], modifiersIds: number[], templatesIds: number[]) => {
    // Validate provider
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error(`Provider (${providerId}) not found`);



    
    // Apply templates or modifiers (give priority to templates)
    // const {textModified, historyModified} = templatesIds.length > 0
    //     ? await templateService.applyTemplatesToText(text, templatesIds)
    //     : await modifierService.applyModifiersToChat(text, modifiersIds, history);
    const {textModified, historyModified} = await modifierService.applyModifiersToChat(text, modifiersIds, history);


    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    console.log(history);
    console.log(textModified);

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

    let previous_history = [];
    if (prompt.history) {
        previous_history = JSON.parse(JSON.stringify(prompt.history));
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