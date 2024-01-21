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

const textGeneration = async (text: string, providerId: number, providersIds: number[], modifiersIds: number[], templateId: number) => {
    const settings: Settings = {};

    const provider = await providerModel.getOneById(providerId);

    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    const modifiers = await modifierModel.getAllByIds(modifiersIds);

    const textModified = await aiPromptService.modifyByModifiers(text, modifiers);

    settings[provider.slug] = provider.model_slug;

    return await httpUtils.get(API_URL, {
        text: textModified,
        provider: provider.slug,
        settings: JSON.stringify(settings)
    });
};

const textGenerationByPromptId = async (promptId: number) => {
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
        provider: prompt.provider.slug
    })
};

const textGenerationByTemplateId = async (templateId: number, content: string) => {
    const template = await templateModel.getOneById(templateId);

    if (!template) throw new Error(`Prompt (${templateId}) not found`);

    let text = content;

    const metadata = JSON.parse(JSON.stringify(template.metadata as JsonValue));
    if (metadata && "modifiers" in metadata) {
        const modifiers = metadata.modifiers;
        text = await aiPromptService.modifyByModifiers(text, modifiers);
    }

    return await httpUtils.get(API_URL, {
        text,
        provider: template.provider.slug
    })
};

export default {
    textGeneration,
    textGenerationByPromptId,
    textGenerationByTemplateId
}