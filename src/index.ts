import express from 'express'
import { auth } from 'express-oauth2-jwt-bearer';
import userRoutes from './routes/userRoutes';
import filterRoutes from './routes/filterRoutes';
import craftRoutes from './routes/craftRoutes';

const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const jwtCheck = auth({
    audience: 'https://easyprompts.wacestudio.pt/api',
    issuerBaseURL: 'https://easyprompts.eu.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Enforce all endpoints
// app.use(jwtCheck);

// Middleware to parse JSON in request body
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/filters', filterRoutes);
app.use('/api/crafts', craftRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('Server ready at: http://localhost:3000'),
)