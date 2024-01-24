import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import aiPromptService from './aiPromptService';
import { JsonValue } from '@prisma/client/runtime/library';
import modifierModel from '../models/modifierModel';
import templateModel from '../models/templateModel';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/generate-text';

interface Settings {
    [key: string]: string
}

const textGeneration = async (text: string, providerId: number, modifiersIds: number[]) => {
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

    console.log(textModified);
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
    settings[prompt.provider.slug] = prompt.provider.model_slug;

    // Request
    return await httpUtils.get(API_URL, {
        text,
        provider: prompt.provider.slug,
        settings: JSON.stringify(settings)
    })
};

const textGenerationByTemplateId = async (templateId: number, content: string) => {
    // Validate template
    const template = await templateModel.getOneById(templateId);
    if (!template) throw new Error(`Prompt (${templateId}) not found`);

    // Apply modifiers
    let text = content;
    const metadata = JSON.parse(JSON.stringify(template.metadata as JsonValue));
    if (metadata && "modifiers" in metadata) {
        const modifiers = metadata.modifiers;
        text = await aiPromptService.modifyByModifiers(text, modifiers);
    }

    // Apply provider model
    const settings: Settings = {};
    settings[template.provider.slug] = template.provider.model_slug;

    // Request
    return await httpUtils.get(API_URL, {
        text,
        provider: template.provider.slug,
        settings: JSON.stringify(settings)
    })
};

export default {
    textGeneration,
    textGenerationByPromptId,
    textGenerationByTemplateId
}