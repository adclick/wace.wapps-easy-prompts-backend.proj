import axios from 'axios';

const textGeneration = async (
    text: string,
) => {
    const url = "https://easyprompts.wacestudio.pt/ai/text/generate-text?" + new URLSearchParams({
        text,
        provider: "openai",
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
};

const imageGeneration = async (
    text: string,
    provider: string,
    resolution: string,
    num_images: string
) => {
    const url = "https://easyprompts.wacestudio.pt/ai/image/generate-image?" + new URLSearchParams({
        text,
        provider,
        resolution,
        num_images,
        sandbox: "true"
    });

    const { data } = await axios.get(url);

    return data;
}


export default {
    textGeneration,
    imageGeneration
}