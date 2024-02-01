import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import httpUtils from '../utils/httpUtils';
import templateService from './templateService';
import modifierService from './modifierService';
import promptService from './promptService';
import parameterModel from '../models/parameterModel';

const BASE_URL = process.env.BASE_URL;
const API_URL = BASE_URL + '/ai/image/generate-image';

interface Settings {
    [key: string]: string
}

const imageGeneration = async (
    text: string,
    providerId: number,
    modifiersIds: number[],
    templatesIds: number[],
    numImages: number,
    imageResolution: string
) => {
    // Validate provider
    const provider = await providerModel.getOneById(providerId);
    if (!provider) throw new Error(`Provider (${providerId}) not found`);

    // Apply templates or modifiers (give priority to templates)
    const textModified = templatesIds.length > 0
        ? await templateService.applyTemplatesToText(text, templatesIds)
        : await modifierService.applyModifiersToText(text, modifiersIds);

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    console.log(text);
    console.log(provider.slug);
    console.log(imageResolution);
    console.log(numImages);
    console.log(settings);

    try {
        // Request
        return await httpUtils.post(API_URL, {
            text: textModified,
            provider: provider.slug,
            resolution: imageResolution,
            num_images: numImages,
            settings: JSON.stringify(settings)
        });
    } catch(e: any) {
        console.error(e);
        throw new Error(e.message);
    }
};

const imageGenerationByPromptId = async (promptId: number) => {
    // Validate Prompt
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

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

    // Request
    return await httpUtils.post(API_URL, {
        text: textModified,
        provider: provider.slug,
        resolution,
        num_images
    })
};

export default {
    imageGeneration,
    imageGenerationByPromptId,
}