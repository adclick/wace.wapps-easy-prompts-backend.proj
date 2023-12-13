import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const nuno = await prisma.users.create({
        data: {
            email: 'nuno.saraiva@wacestudio.com',
            auth0_id: 'auth0|653116ca7e1334d7874ff7f7',
            languages: {
                create: {
                    name: "English",
                    slug: "en"
                }
            }
        },
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