import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
    const languageEN = await prisma.languages.create({
        data: {
            name: "English",
            slug: "en",
        }
    });

    const languagePT = await prisma.languages.create({
        data: {
            name: "Portuguese",
            slug: "pt"
        }
    });

    const userNunoSaraiva = await prisma.users.create({
        data: {
            email: "nuno.saraiva@wacestudio.com",
            theme: "dark",
            external_id: randomUUID()
        }
    });

    const myRepository = await prisma.repositories.create({
        data: {
            name: "My Repository",
            slug: "my-repository",
            user_id: userNunoSaraiva.id,
        },
    });

    const waceRepository = await prisma.repositories.create({
        data: {
            name: "Wace",
            slug: "wace",
            user_id: userNunoSaraiva.id,
        }
    });

    const technologyTextGeneration = await prisma.technologies.create({
        data: {
            name: "Text Generation",
            slug: "text-generation",
            default: true
        }
    });

    const technologyImageGeneration = await prisma.technologies.create({
        data: {
            name: "Image Generation",
            slug: "image-generation",
            default: false
        }
    });

    // Connect Openai to Technologies
    const providerOpenai = await prisma.providers.create({
        data: {
            name: "Openai",
            slug: "openai",
            technologies_providers: {
                createMany: {
                    data: [
                        {
                            technology_id: technologyTextGeneration.id,
                            default: true
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

    const parameterNumberOfImages = await prisma.parameters.create({
        data: {
            name: "Number of Images",
            slug: "number-of-images",
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenai.id,
            content: {"num-images": "4"}
        }
    });

    // Modifiers
    const modifierApplyRain = await prisma.crafts.create({
        data: {
            name: "Apply rain",
            slug: "apply-rain",
            content: "The image must include an immersive rainfall. The rain should be depicted with fine details, such as individual raindrops",
            description: "This modifier will apply rain to your images",
            score: 50,
            type: "MODIFIER",
            created_at: new Date(),
            technology_id: technologyTextGeneration.id,
            user_id: userNunoSaraiva.id,
            language_id: languageEN.id,
            repository_id: waceRepository.id
        }
    });

    // Prompts
    const sereneBeachPrompt = await prisma.crafts.create({
        data: {
            name: "Serene beach",
            slug: "serene-beach",
            content: "Generate a realistic image of a serene beach sunset with vibrant colors",
            description: "This prompt will generate a beach image",
            score: 50,
            type: "PROMPT",
            created_at: new Date(),
            technology_id: technologyImageGeneration.id,
            provider_id: providerOpenai.id,
            user_id: userNunoSaraiva.id,
            language_id: languageEN.id,
            repository_id: waceRepository.id
        }
    });

    const promptHeadlinesAuto = await prisma.crafts.create({
        data: {
            name: "Headlines para Indústria Automóvel",
            slug: "headlines-para-industria-automovel",
            content: "Cria títulos cativantes para uma série de artigos relacionados às tendências da indústria automóvel.",
            description: "Títulos cativantes para indústria automóvel.",
            score: 50,
            type: "PROMPT",
            created_at: new Date(),
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenai.id,
            user_id: userNunoSaraiva.id,
            language_id: languagePT.id,
            repository_id: waceRepository.id,
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