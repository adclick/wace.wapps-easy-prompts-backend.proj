import axios from 'axios';
import { PromptChatMessage } from '../models/promptChatMessageModel';

const API_URL = process.env.EDENAI_API_URL;
const API_KEY = process.env.EDENAI_API_KEY;

const textGeneration = async (
    text: string,
    provider: string,
    temperature: string,
    settings: string
) => {
    try {
        const options = getOptions('/v2/text/generation', {
            providers: provider,
            text,
            temperature,
            settings
        });

        const { data } = await axios.request(options);
        return data[provider]['generated_text'];

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const imageGeneration = async (
    text: string,
    provider: string,
    temperature: string,
    num_images: number,
    resolution: string,
    settings: string
) => {
    try {
        const options = getOptions('/v2/image/generation', {
            providers: provider,
            text,
            temperature,
            num_images,
            resolution,
            settings
        });

        const { data } = await axios.request(options);
        
        if (!(provider in data)) throw new Error('Provider unavailable');

        console.log(num_images);
        console.log(resolution);
        console.log(data);
        if (!('items' in data[provider])) throw new Error('Provider could not generate images');

        return data[provider].items.map((image: {image_resource_url: string}) => image.image_resource_url);

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const chat = async (
    text: string,
    provider: string,
    previous_history: PromptChatMessage[],
    temperature: string,
    settings: string
) => {
    try {
        const options = getOptions('/v2/text/chat', {
            providers: provider,
            text,
            temperature,
            previous_history,
            settings
        });

        const { data } = await axios.request(options);
        return data[provider]['generated_text'];

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getOptions = (urlPath: string, data: any) => {
    return {
        method: "POST",
        url: API_URL + urlPath,
        headers: { authorization: "Bearer " + API_KEY },
        data,
    };
}

export default {
    textGeneration,
    imageGeneration,
    chat
}