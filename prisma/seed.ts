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

    const waceItRepository = await prisma.repository.create({
        data: {
            name: "Wace IT",
            slug: "wace-it",
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
            technology_id: technologyTextGeneration.id,
        }
    });

    const providerOpenaiDalle2 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "Dall-E 2",
            model_slug: "dall-e-2",
            technology_id: technologyImageGeneration.id,
        }
    });

    const providerOpenaiDalle3 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "Dall-E 3",
            model_slug: "dall-e-3",
            technology_id: technologyImageGeneration.id,
        }
    });

    const providerStabilityAI = await prisma.provider.create({
        data: {
            name: "Stability AI",
            slug: "stability-ai",
            model_name: "Stable Diffusion",
            model_slug: "stable-diffusion-v1-6",
            technology_id: technologyImageGeneration.id,
        }
    });

    const providerOpenAIChatGPT35 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "ChatGPT 3.5",
            model_slug: "gpt-3.5-turbo",
            technology_id: technologyChat.id,
        }
    });

    const providerOpenAIChatGPT4 = await prisma.provider.create({
        data: {
            name: "Openai",
            slug: "openai",
            model_name: "ChatGPT 4",
            model_slug: "gpt-4",
            technology_id: technologyChat.id,
        }
    });

    let prompts = [];

    for (let i = 0; i < 50; i++) {
        prompts.push({
            title: "teste " + i,
            slug: "teste-" + i,
            description: "teste",
            content: "teste",
            technology_id: 1,
            provider_id: 1,
            language_id: 1,
            user_id: 1,
            repository_id: 1
        })
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