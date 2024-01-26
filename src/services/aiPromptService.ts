import httpUtils from "../utils/httpUtils";
import { History } from "./aiChatService";

const BASE_URL = process.env.BASE_URL;

const modifyByModifiers = async (prompt: string, modifiers: string[]) => {
    let promptOptimized = prompt;

    promptOptimized = await httpUtils.post(`${BASE_URL}/ai/prompt/modify`, {
        text: promptOptimized,
        modifiers: JSON.stringify(modifiers),
        language: "en"
    });

    return promptOptimized;
}

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

const optimizeChat = (text: string, history: History[], modifiers: string[]) => {
    let finalText = text;

    if (history.length === 0) {
        let optimization = "In this conversation, I need you to always consider the following criteria:\n";
        modifiers.map(mt => {
            optimization += " - " + mt + "\n";
        });
        optimization += `My first prompt is:\n`;
        finalText = optimization + text;
    } else {
        let optimization = "In this conversation, I need you to always consider the following criteria:\n";
        modifiers.map(mt => {
            optimization += " - " + mt + "\n";
        });
        optimization += `My first prompt is:\n`;

        history[0]['message'] = optimization + history[0]['message'];
        finalText = text;
    }

    return { text: finalText, history: history };
}

export default {
    modifyByModifiers,
    optimizeText,
    optimizeChat
}