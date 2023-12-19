import axios from 'axios';

const textGeneration = async (
    text: string,
    prompt_id: number | null,
    modifiers_ids: number[] = []
) => {
    return text;
};

// http://localhost:3000/api/ai/image-generation/?text=planes&provider=openai&resolution=512x512&num_images=1
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
        num_images
    });

    // const url = "https://easyprompts.wacestudio.pt/ai/image/generate-image?text=planes&provider=openai&resolution=512x512&num_images=1";
    // const url = "https://easyprompts.wacestudio.pt/api/filters/123";
    // const url = "https://api.apis.guru/v2/providers.json";

    const { data } = await axios.get(url);

    return data;
}


export default {
    textGeneration,
    imageGeneration
}