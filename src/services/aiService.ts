import axios from 'axios';
import providerModel from '../models/providerModel';
import parameterModel from '../models/parameterModel';

const textGeneration = async (
    text: string,
    providerId: number
) => {
    const provider = await providerModel.getById(providerId);
    if (!provider) throw new Error('Provider not found');

    const url = "https://easyprompts.wacestudio.pt/ai/text/generate-text?" + new URLSearchParams({
        text,
        provider: provider.slug,
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
};

const imageGeneration = async (
    text: string,
    providerId: number,
    parameters: {slug: string, value: string}[],
) => {
    const provider = await providerModel.getById(providerId);
    if (!provider) throw new Error('Provider not found');

    let numImagesParameter = parameters.find(p => p.slug === 'num_images');
    let resolutionParameter = parameters.find(p => p.slug === 'resolution');

    const url = "https://easyprompts.wacestudio.pt/ai/image/generate-image?" + new URLSearchParams({
        text,
        provider: provider.slug,
        num_images: numImagesParameter !== undefined ? numImagesParameter.value : "1",
        resolution: resolutionParameter !== undefined ? resolutionParameter.value : "256x256",
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
}


export default {
    textGeneration,
    imageGeneration
}