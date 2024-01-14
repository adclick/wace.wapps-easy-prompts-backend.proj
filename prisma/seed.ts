import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import textUtils from '../src/utils/textUtils';

const prisma = new PrismaClient();

async function main() {
    const languageEN = await prisma.language.create({
        data: {
            name: "English",
            slug: "en",
        }
    });

    const languagePT = await prisma.language.create({
        data: {
            name: "Portuguese",
            slug: "pt"
        }
    });

    const userNunoSaraiva = await prisma.user.create({
        data: {
            email: "nuno.saraiva@wacestudio.com",
            username: "nuno.saraiva",
            theme: "dark",
            external_id: randomUUID()
        }
    });

    const myRepository = await prisma.repository.create({
        data: {
            name: "My Repository",
            slug: textUtils.toSlug("My Repository"),
            user_id: userNunoSaraiva.id,
        },
    });

    const waceRepository = await prisma.repository.create({
        data: {
            name: "Wace",
            slug: "wace",
            user_id: userNunoSaraiva.id,
        }
    });

    const adclickRepository = await prisma.repository.create({
        data: {
            name: "Adclick",
            slug: "adclick",
            user_id: userNunoSaraiva.id,
        }
    });

    await prisma.mode.createMany({
        data: [
            {
                name: "Text Generation (ChatGPT 3.5)",
                slug: "text-generation-(chatgpt-3.5)",
                technology_name: "Text Generation",
                technology_slug: "text-generation",
                provider_name: "Openai",
                provider_slug: "openai",
                model_name: "ChatGPT 3.5 Turbo",
                model_slug: "gpt-3.5-turbo-instruct"
            },
            {
                name: "Text Generation (Google Gemini)",
                slug: "text-generation-(google-gemini)",
                technology_name: "Text Generation",
                technology_slug: "text-generation",
                provider_name: "Google",
                provider_slug: "google",
                model_name: "Gemini pro",
                model_slug: "gemini-pro"
            },
            {
                name: "Image Generation (Dall-E 2)",
                slug: "image-generation-(dall-e-2)",
                technology_name: "Image Generation",
                technology_slug: "image-generation",
                provider_name: "Openai",
                provider_slug: "ppenai",
                model_name: "Dall-E 2",
                model_slug: "dall-e-2"
            },
            {
                name: "Image Generation (Dall-E 3)",
                slug: "image-generation-(dall-e-3)",
                technology_name: "Image Generation",
                technology_slug: "image-generation",
                provider_name: "Openai",
                provider_slug: "openai",
                model_name: "Dall-E 3",
                model_slug: "dall-e-3"
            },
            {
                name: "Image Generation (Stability AI)",
                slug: "image-generation-(stability-ai)",
                technology_name: "Image Generation",
                technology_slug: "image-generation",
                provider_name: "Stability AI",
                provider_slug: "stability-ai",
                model_name: "Stable Diffusion V1 6",
                model_slug: "stable-diffusion-v1-6"
            },
            {
                name: "Chat (ChatGPT 3.5)",
                slug: "chat-(chatgpt-3.5)",
                technology_name: "Chat",
                technology_slug: "chat",
                provider_name: "Openai",
                provider_slug: "openai",
                model_name: "ChatGPT 3.5 Turbo",
                model_slug: "gpt-3.5-turbo"
            },
            {
                name: "Chat (ChatGPT 4)",
                slug: "chat-(chatgpt-4)",
                technology_name: "Chat",
                technology_slug: "chat",
                provider_name: "Openai",
                provider_slug: "openai",
                model_name: "ChatGPT 4",
                model_slug: "gpt-4"
            }
        ]
    });

    const technologyChat = await prisma.technology.create({
        data: {
            name: "Chat",
            slug: "chat",
            default: true
        }
    });

    const technologyTextGeneration = await prisma.technology.create({
        data: {
            name: "Text Generation",
            slug: "text-generation",
            default: false
        }
    });

    const technologyImageGeneration = await prisma.technology.create({
        data: {
            name: "Image Generation",
            slug: "image-generation",
            default: false
        }
    });

    // Connect Openai to Technologies
    const providerOpenai = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyChat.id,
                            default: true
                        },
                        {
                            technology_id: technologyTextGeneration.id,
                            default: false
                        },
                        {
                            technology_id: technologyImageGeneration.id,
                            default: false
                        }
                    ]
                }
            }
        }
    });

    const providerGoogle = await prisma.provider.create({
        data: {
            name: "Google",
            slug: "google",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyTextGeneration.id,
                            default: true
                        },
                        {
                            technology_id: technologyChat.id,
                            default: false
                        },
                    ]
                }
            }
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })