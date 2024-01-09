import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

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
            slug: slugify("My Repository", { lower: true }),
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

    // Prompts
    const helloChat = await prisma.prompt.create({
        data: {
            title: "Hello Chat",
            slug: "hello-chat",
            description: "Sample chat prompt",
            content: "Tell me a story",
            metadata: {
                requests: [
                    {role: "user", message: "From now on, you will talk like Yoda"},
                    {role: "assistant", message: "Ok, got it"},
                ]
            },
            technology_id: technologyChat.id,
            provider_id: providerOpenai.id,
            user_id: userNunoSaraiva.id,
            language_id: languageEN.id,
            repository_id: waceRepository.id
        }
    });

    const sereneBeachPrompt = await prisma.prompt.create({
        data: {
            title: "Serene beach",
            slug: "serene-beach",
            content: "Generate a realistic image of a serene beach sunset with vibrant colors",
            description: "This prompt will generate a beach image",
            technology_id: technologyImageGeneration.id,
            provider_id: providerOpenai.id,
            user_id: userNunoSaraiva.id,
            language_id: languageEN.id,
            repository_id: waceRepository.id
        }
    });

    const promptHeadlinesAuto = await prisma.prompt.create({
        data: {
            title: "Headlines para Indústria Automóvel",
            slug: "headlines-para-industria-automovel",
            content: "Cria títulos cativantes para uma série de artigos relacionados às tendências da indústria automóvel.",
            description: "Títulos cativantes para indústria automóvel.",
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenai.id,
            user_id: userNunoSaraiva.id,
            language_id: languagePT.id,
            repository_id: waceRepository.id,
        }
    });

    // Modifiers
    const modifierApplyRain = await prisma.modifier.create({
        data: {
            title: "Apply rain",
            slug: "apply-rain",
            content: "The image must include an immersive rainfall. The rain should be depicted with fine details, such as individual raindrops",
            description: "This modifier will apply rain to your images",
            user_id: userNunoSaraiva.id,
            language_id: languageEN.id,
            repository_id: waceRepository.id
        }
    });

    const parameterNumberOfImages = await prisma.parameter.create({
        data: {
            name: "Number of Images",
            slug: "num_images",
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenai.id,
            content: { "num_images": "4" },
        }
    });

    await prisma.promptParameter.create({
        data: {
            prompt_id: sereneBeachPrompt.id,
            parameter_id: parameterNumberOfImages.id,
            value: "1"
        }
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