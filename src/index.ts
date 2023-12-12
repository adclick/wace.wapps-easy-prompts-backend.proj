import express from 'express'
import userRoutes from './routes/userRoutes';
import filtersRoutes from './routes/filtersRoutes';
import modifiersRoutes from './routes/modifiersRoutes';
const app = express();


// Middleware to parse JSON in request body
app.use(express.json());

// Use user routes
app.use('/api', userRoutes);
app.use('/api', filtersRoutes);
app.use('/api', modifiersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('Server ready at: http://localhost:3000'),
)