import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import templateService from './templateService';
import modifierService from './modifierService';
import promptService from './promptService';
import parameterModel from '../models/parameterModel';
import edenaiClient from '../clients/edenaiClient';
import templateModel from '../models/templateModel';
import modifierModel from '../models/modifierModel';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/text/generate-text';

interface Settings {
    [key: string]: string
}

const textGeneration = async (text: string, providerId: number, modifiersIds: number[], templatesIds: number[]) => {
    // Validate provider
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    const templates = await templateModel.getAllByIds(templatesIds);
    for (const template of templates) {
        const templateModifiersIds = template.templates_modifiers.map(m => m.modifier_id);

        for (const templateModifierId of templateModifiersIds) {
            if (modifiersIds.includes(templateModifierId)) {
                continue;
            }

            modifiersIds.push(templateModifierId);
        }
    }

    // Apply templates or modifiers (give priority to templates)
    const textModified = await modifierService.applyModifiersToText(text, modifiersIds);

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    // Request
    return await edenaiClient.textGeneration(
        textModified,
        provider.slug,
        temperature ? temperature.value : '0.3',
        JSON.stringify(settings)
    );
};

const textGenerationByPromptId = async (promptId: number) => {
    // Validate Prompt
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    // Apply modifiers
    const textModified = await promptService.applyModifiersAndTemplatesFromPrompt(prompt.id);

    // Apply provider model
    const settings: Settings = {};
    let provider = prompt.provider;
    if (!provider) {
        provider = await providerModel.getOneDefaultByTechnologyId(prompt.technology_id);
        if (!provider) throw new Error('No providers found');
    }
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    // Request
    return await edenaiClient.textGeneration(
        textModified,
        provider.slug,
        temperature ? temperature.value : '0.3',
        JSON.stringify(settings)
    );
};

export default {
    textGeneration,
    textGenerationByPromptId,
}