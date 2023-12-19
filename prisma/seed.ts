import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const languageEN = await prisma.languages.create({
        data: {
            name: "English",
            slug: "en"
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
            auth0_id: "123",
            theme: "dark"
        }
    });

    const nunoSaraivaRepository = await prisma.repositories.create({
        data: {
            name: "My Repository",
            slug: "my-repository",
            user_id: userNunoSaraiva.id
        }
    });

    const waceRepository = await prisma.repositories.create({
        data: {
            name: "Wace",
            slug: "wace",
            user_id: nunoSaraivaRepository.user_id,
            users_repositories: {
                create: {
                    user_id: nunoSaraivaRepository.id
                }
            }
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

    const providerOpenai = await prisma.providers.create({
        data: {
            name: "Openai",
            slug: "openai",
        }
    });

    const textGenerationOpenai = await prisma.technologies_providers.create({
        data: {
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenai.id,
            default: true
        }
    });

    const imageGenerationOpenai = await prisma.technologies_providers.create({
        data: {
            technology_id: technologyImageGeneration.id,
            provider_id: providerOpenai.id,
            default: true
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

    const modifier1 = await prisma.crafts.create({
        data: {
            name: "Modifier 1",
            slug: "modifier-1",
            content: "",
            description: "",
            score: 50,
            type: "MODIFIER",
            created_at: new Date(),
            technology_id: technologyTextGeneration.id,
            user_id: userNunoSaraiva.id,
            language_id: languageEN.id,
            repository_id: nunoSaraivaRepository.id
        }
    });

    const prompt1 = await prisma.crafts.create({
        data: {
            name: "Keywords de Natal",
            slug: "keywords-de-natal",
            content: "Cria uma lista abrangente de keywords relevantes e relacionadas com o Natal. Garante que as keywords abranjam um amplo espectro de aspectos e complexidades associadas ao tópico. O objetivo é capturar a essência do Natal incluindo termos amplamente reconhecidos, bem como aqueles que podem ser mais específicos ou especializados. Fornece uma variedade diversificada de keywords para atender aos diferentes níveis de familiaridade com o tema.",
            description: "Lista de keywords relevantes sobre o Natal",
            score: 50,
            type: "PROMPT",
            created_at: new Date(),
            technology_id: technologyTextGeneration.id,
            provider_id: providerOpenai.id,
            user_id: userNunoSaraiva.id,
            language_id: languagePT.id,
            repository_id: waceRepository.id,
            crafted_by: {
                create: {
                    crafting_id: modifier1.id
                }
            }
        }
    });

    const prompt2 = await prisma.crafts.create({
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
            crafted_by: {
                create: {
                    crafting_id: modifier1.id
                }
            }
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