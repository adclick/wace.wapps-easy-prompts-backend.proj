import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import templateService from './templateService';
import modifierService from './modifierService';
import promptService from './promptService';
import parameterModel from '../models/parameterModel';
import edenaiClient from '../clients/edenaiClient';
import templateModel from '../models/templateModel';
import BadRequestError from '../errors/BadRequestError';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/image/generate-image';

interface Settings {
    [key: string]: string
}

const imageGeneration = async (
    text: string,
    providerUUID: string,
    modifiersUUIDs: string[],
    templatesUUIDs: string[],
    numImages: number,
    imageResolution: string
) => {
    // Validate provider
    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new Error(`Provider "${providerUUID}" not found`);

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

    // Apply templates or modifiers (give priority to templates)
    const textModified = await modifierService.applyModifiersToText(text, modifiersIds);

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    return await edenaiClient.imageGeneration(
        textModified,
        provider.slug,
        temperature ? temperature.value : '0.3',
        numImages,
        imageResolution,
        JSON.stringify(settings)
    );
};

const imageGenerationByPromptId = async (promptUUID: string) => {
    // Validate Prompt
    const prompt = await promptModel.getOneByUUID(promptUUID);
    if (!prompt) throw new BadRequestError({ message: `Prompt "${promptUUID}" not found` });

    // Apply modifiers
    const textModified = await promptService.applyModifiersAndTemplatesFromPrompt(prompt.id);

    let resolution = '1024x1024';
    let num_images = 1;

    for (const promptParameter of prompt.prompts_parameters) {
        const parameter = await parameterModel.getOneById(promptParameter.parameter_id);
        if (!parameter || !promptParameter.value) continue;

        if (parameter.slug === "resolution") resolution = promptParameter.value;
        if (parameter.slug === "num_images") num_images = parseInt(promptParameter.value);
    }

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
    return await edenaiClient.imageGeneration(
        textModified,
        provider.slug,
        temperature ? temperature.value : '0.3',
        num_images,
        resolution,
        JSON.stringify(settings)
    );
};

export default {
    imageGeneration,
    imageGenerationByPromptId,
}