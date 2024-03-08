import providerModel from '../models/providerModel';
import promptModel from '../models/promptModel';
import modifierService from './modifierService';
import parameterModel from '../models/parameterModel';
import edenaiClient from '../clients/edenaiClient';
import BadRequestError from '../errors/BadRequestError';

interface Settings {
    [key: string]: string
}

const chat = async (
    providerUUID: string,
    chatMessages: { role: string, message: string, modifiers_ids: string[] }[],
) => {
    // Validate provider
    const provider = await providerModel.getOneByUUID(providerUUID);
    if (!provider) throw new Error(`Provider "${providerUUID}" not found`);

    const lastMessage = chatMessages.pop();
    if (!lastMessage) throw new BadRequestError({ message: "No message to process" });

    const lastMessageModified = await modifierService.applyModifiersToText(lastMessage.message, lastMessage.modifiers_ids);

    const chatMessagesModified = [];
    for (const chatMessage of chatMessages) {
        const newChatMessage = chatMessage;

        if (chatMessage.role === 'user') {
            newChatMessage.message = await modifierService.applyModifiersToText(chatMessage.message, chatMessage.modifiers_ids);
        }

        chatMessagesModified.push(newChatMessage);
    }

    // Apply provider model
    const settings: Settings = {};
    settings[provider.slug] = provider.model_slug;

    const temperature = await parameterModel.getTemperature(provider.id);

    return await edenaiClient.chat(
        lastMessageModified,
        provider.slug,
        chatMessagesModified,
        temperature ? temperature.value : '0.3',
        JSON.stringify(settings)
    );
};

const chatByPromptId = async (promptUUID: string) => {
    // Validate Prompt
    const prompt = await promptModel.getOneByUUID(promptUUID);
    if (!prompt) throw new BadRequestError({ message: `Prompt "${promptUUID}" not found` });

    const text = prompt.content;
    const chatMessages = prompt.prompts_chat_messages.map(m => {
        return {
            role: m.role,
            message: m.message,
            modifiers_ids: []
        }
    });


    const lastMessage = chatMessages.pop();
    if (!lastMessage) throw new BadRequestError({ message: "No message to process" });

    const lastMessageModified = await modifierService.applyModifiersToText(lastMessage.message, lastMessage.modifiers_ids);

    const chatMessagesModified = [];
    for (const chatMessage of chatMessages) {
        const newChatMessage = chatMessage;

        if (chatMessage.role === 'user') {
            newChatMessage.message = await modifierService.applyModifiersToText(chatMessage.message, chatMessage.modifiers_ids);
        }

        chatMessagesModified.push(newChatMessage);
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

    return await edenaiClient.chat(
        lastMessageModified,
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