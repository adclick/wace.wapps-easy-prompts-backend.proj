import axios from 'axios';

const textGeneration = async (
    text: string,
    prompt_id: number|null,
    modifiers_ids: number[] = []
) => {
    return text;
};

const imageGeneration = async (
    text: string,
    provider: string,
    resolution: string,
    num_images: string
) => {

    const url = "https://easyprompts.wacestudio.pt/ai/image/generate-image?text=planes&provider=openai&resolution=512x512&num_images=1";

    console.log(url)

    const response = await axios.get(url, {
        timeout: 60000
    });

    console.log(response);

    return response;
}


export default {
    textGeneration,
    imageGeneration
}