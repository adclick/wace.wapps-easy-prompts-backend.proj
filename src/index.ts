import express from 'express'
import { auth } from 'express-oauth2-jwt-bearer';
import userRoutes from './routes/userRoutes';
import filterRoutes from './routes/filterRoutes';
import technologyRoutes from './routes/technologyRoutes';
import providerRoutes from './routes/providerRoutes';
import promptRoutes from './routes/promptRoutes';
import modifierRoutes from './routes/modifierRoutes';
import templateRoutes from './routes/templateRoutes';
import threadsRoutes from './routes/threadRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import aiRoutes from './routes/aiRoutes';


const cors = require('cors');

const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const jwtCheck = auth({
//     audience: process.env.AUTH0_AUDIENCE,
//     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//     tokenSigningAlg: 'RS256'
// });

// Enforce all endpoints
// app.use(jwtCheck);

// Middleware to parse JSON in request body
app.use(express.json());

app.use(cors());

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/filters', filterRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/modifiers', modifierRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/threads', threadsRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('Server ready at: http://localhost:3000'),
)