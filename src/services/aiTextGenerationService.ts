import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import modifierService from './modifierService';
import parameterModel from '../models/parameterModel';
import edenaiClient from '../clients/edenaiClient';
import templateModel from '../models/templateModel';
import templateService from './templateService';
import BadRequestError from '../errors/BadRequestError';

interface Settings {
    [key: string]: string
}

const textGeneration = async (
    text: string,
    providerUUID: string,
    modifiersUUIDs: string[],
    templatesUUIDs: string[]
) => {
    // Validate provider
    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new Error(`Provider "${providerUUID}" not found`);

    const modifiersIds = await deduplicateModifiersIds(templatesUUIDs, modifiersUUIDs);

    // Apply templates or modifiers (give priority to templates)
    const textModified = await modifierService.applyModifiersToText(text, modifiersIds);

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    return await edenaiClient.textGeneration(
        textModified,
        provider.slug,
        temperature ? temperature.value : '0.3',
        JSON.stringify(settings)
    );
};

const textGenerationByPromptId = async (promptUUID: string) => {
    // Validate Prompt
    const prompt = await promptModel.getOneByUUID(promptUUID);
    if (!prompt) throw new BadRequestError({ message: `Prompt "${promptUUID}" not found` });

    const modifiersIds = await deduplicateModifiersIds(
        prompt.prompts_templates.map(t => t.template.uuid),
        prompt.prompts_modifiers.map(m => m.modifier.uuid)
    );

    // Apply modifiers
    const textModified = await modifierService.applyModifiersToText(prompt.content, modifiersIds);

    console.log(textModified);

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

const deduplicateModifiersIds = async (templatesUUIDs: string[], modifiersUUIDs: string[]) => {
    const templates = await templateModel.getAllByUUIDs(templatesUUIDs);
    const modifiersIds = await modifierService.getIdsFromUUIDs(modifiersUUIDs);

    for (const template of templates) {
        const templateModifiersIds = template.templates_modifiers.map(m => m.modifier_id);

        for (const templateModifierId of templateModifiersIds) {
            if (modifiersIds.includes(templateModifierId)) {
                continue;
            }

            modifiersIds.push(templateModifierId);
        }
    }

    return modifiersIds;
}

export default {
    textGeneration,
    textGenerationByPromptId,
}