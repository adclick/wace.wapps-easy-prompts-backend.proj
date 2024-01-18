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

    const technologyChat = await prisma.technology.create({
        data: {
            name: "Chat",
            slug: "chat",
            default: true
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

    const prompts = [
        { "prompt": "Write a dialogue between two AI characters discussing the future of technology.", "name": "AI Tech Future", "slug": "ai-tech-future" },
        { "prompt": "Describe a day in the life of a software developer working on a futuristic project.", "name": "Futuristic Dev Day", "slug": "futuristic-dev-day" },
        { "prompt": "Share your thoughts on the impact of technology on parenthood.", "name": "Tech and Parenthood", "slug": "tech-and-parenthood" },
        { "prompt": "Create a story where a cat becomes the hero of a virtual world.", "name": "Cat Hero Tale", "slug": "cat-hero-tale" },
        { "prompt": "Discuss the challenges and triumphs of being a new dad while managing a career in software development.", "name": "New Dad in Tech", "slug": "new-dad-in-tech" },
        { "prompt": "Imagine a world where multiple sclerosis is cured, and describe a day in the life of someone who was once affected.", "name": "MS Cure Utopia", "slug": "ms-cure-utopia" },
        { "prompt": "Write a poem about the bond between a developer and their code.", "name": "Code Bond Poetry", "slug": "code-bond-poetry" },
        { "prompt": "Explore the relationship between virtual pets and real-life companionship.", "name": "Virtual Pet Bond", "slug": "virtual-pet-bond" },
        { "prompt": "Share your perspective on the role of cats in the world of programming.", "name": "Cats in Code", "slug": "cats-in-code" },
        { "prompt": "Craft a story where a software developer discovers a hidden talent for solving mysteries.", "name": "Dev Mystery Solver", "slug": "dev-mystery-solver" }
    ];

    const data: any = [];
    prompts.forEach(prompt => {
        data.push({
            title: prompt.name,
            slug: prompt.slug,
            content: prompt.prompt,
            description: prompt.prompt,
            language_id: languageEN.id,
            repository_id: myRepository.id,
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenAIChatGPT35.id,
            user_id: userNunoSaraiva.id
        });
    })

    await prisma.prompt.createMany({ data });
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