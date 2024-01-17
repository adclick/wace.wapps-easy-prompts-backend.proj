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
    const providerOpenaiChatGPT35Turbo = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "ChatGPT 3.5",
            model_slug: "gpt-3.5-turbo-instruct",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyTextGeneration.id,
                            default: true
                        }
                    ]
                }
            }
        }
    });

    const providerOpenaiDalle2 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "Dall-E 2",
            model_slug: "dall-e-2",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyImageGeneration.id,
                            default: false
                        }
                    ]
                }
            }
        }
    });

    const providerOpenaiDalle3 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "Dall-E 3",
            model_slug: "dall-e-3",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyImageGeneration.id,
                            default: true
                        }
                    ]
                }
            }
        }
    });

    const providerStabilityAI = await prisma.provider.create({
        data: {
            name: "Stability AI",
            slug: "stability-ai",
            model_name: "Stable Diffusion",
            model_slug: "stable-diffusion-v1-6",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyImageGeneration.id,
                            default: false
                        }
                    ]
                }
            }
        }
    });

    const providerOpenAIChatGPT35 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "ChatGPT 3.5",
            model_slug: "gpt-3.5-turbo",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyChat.id,
                            default: false
                        }
                    ]
                }
            }
        }
    });

    const providerOpenAIChatGPT4 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "ChatGPT 4",
            model_slug: "gpt-4",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyChat.id,
                            default: true
                        }
                    ]
                }
            }
        }
    });

    const prompts = [];
    for (let i = 0; i < 100; i++) {
        prompts.push({
            title: "Prompt " + i,
            slug: "prompt-" + i,
            content: "test",
            description: "test",
            language_id: languageEN.id,
            repository_id: myRepository.id,
            technology_id: technologyChat.id,
            provider_id: providerOpenAIChatGPT4.id,
            user_id: userNunoSaraiva.id

        });
    }

    await prisma.prompt.createMany({
        data: prompts
    })
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