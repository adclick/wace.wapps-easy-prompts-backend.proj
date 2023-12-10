import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/users/:id', async (req, res) => {
    const user = await prisma.users.findFirst({
        where: {
            auth0_id: req.params.id
        }
    });
    
    res.json(user)
});

app.post('/prompt', async (req, res) => {
    await prisma.prompts.create({
        data: {
            name: "",
            slug: "",
            content: "",
            provider_id: 1,
            technology_id: 1
        }
    })
});

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)