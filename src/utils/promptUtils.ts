import { PromptChatMessage } from "../models/promptChatMessageModel";

const optimizeText = async (text: string, texts: string[], language: string): Promise<string> => {
    let finalText = text;

    switch (language.toLowerCase()) {
        case "en":
            finalText = "Consider the following prompt and apply the given criteria: \n";
            finalText += "prompt:\n";
            finalText += " - " + text + "\n";
            finalText += "criteria:\n";

            texts.map(t => {
                finalText += " - " + t + "\n";
            });

            return finalText;
        case "pt":
            finalText = "Considera o seguinte prompt e aplica os seguintes critérios: \n";
            finalText += "prompt:\n";
            finalText += " - " + text + "\n";
            finalText += "critérios:\n";

            texts.map(t => {
                finalText += " - " + t + "\n";
            });

            return finalText;
        default:
            return finalText;
    }
}

const optimizeChat = (
    text: string,
    texts: string[],
    chatMessages: PromptChatMessage[],
    language: string
): { textModified: string, chatMessagesModified: PromptChatMessage[] } => {
    let finalText = text;

    switch (language) {
        case 'en':
            if (chatMessages.length === 0) {
                let optimization = "In this conversation, I need you to always consider the following criteria:\n";
                texts.map(t => {
                    optimization += " - " + t + "\n";
                });
                optimization += `My first prompt is:\n`;
                finalText = optimization + text;
            } else {
                let optimization = "In this conversation, I need you to always consider the following criteria:\n";
                texts.map(t => {
                    optimization += " - " + t + "\n";
                });
                optimization += `My first prompt is:\n`;

                chatMessages[0]['message'] = optimization + chatMessages[0]['message'];
            }
            break;
    }

    return { textModified: finalText, chatMessagesModified: chatMessages };
}

export default {
    optimizeText,
    optimizeChat
}