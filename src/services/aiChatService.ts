import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import modifierService from './modifierService';
import { PromptChatMessage } from '../models/promptChatMessageModel';
import templateService from './templateService';
import parameterModel from '../models/parameterModel';
import edenaiClient from '../clients/edenaiClient';
import templateModel from '../models/templateModel';

interface Settings {
    [key: string]: string
}

const chat = async (text: string, providerId: number, chatMessages: PromptChatMessage[], modifiersIds: number[], templatesIds: number[]) => {
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
    const {textModified, chatMessagesModified} = await modifierService.applyModifiersToChat(text, modifiersIds, chatMessages);

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    return await edenaiClient.chat(
        textModified,
        provider.slug,
        chatMessagesModified,
        temperature ? temperature.value : '0.3',
        JSON.stringify(settings)
    );
};

const chatByPromptId = async (promptId: number) => {
    // Validate Prompt
    const prompt = await promptModel.getOneById(promptId);
    if (!prompt) throw new Error(`Prompt (${promptId}) not found`);

    const text = prompt.content;
    const chatMessages = prompt.prompts_chat_messages.map(m => {
        return {
            role: m.role,
            message: m.message
        }
    });
    const templatesIds = prompt.prompts_templates.map(pt => pt.template_id);
    const modifiersIds = prompt.prompts_modifiers.map(pm => pm.modifier_id);

    // Apply templates or modifiers (give priority to templates)
    const { textModified, chatMessagesModified } = templatesIds.length > 0
        ? await templateService.applyTemplatesToChat(text, templatesIds, chatMessages)
        : await modifierService.applyModifiersToChat(text, modifiersIds, chatMessages);

    // Apply provider model
    const settings: Settings = {};
    let provider = prompt.provider;
    if (!provider) {
        provider = await providerModel.getOneDefaultByTechnologyId(prompt.technology_id);
        if (!provider) throw new Error('No providers found');
    }
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    return await edenaiClient.chat(
        textModified,
        provider.slug,
        chatMessagesModified,
        temperature ? temperature.value : '0.3',
        JSON.stringify(settings)
    );
};


export default {
    chat,
    chatByPromptId,
}