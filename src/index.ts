import express from 'express'
import userRoutes from './routes/userRoutes';
import filtersRoutes from './routes/filtersRoutes';
const app = express();


// Middleware to parse JSON in request body
app.use(express.json());

// Use user routes
app.use('/', userRoutes);
app.use('/', filtersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('Server ready at: http://localhost:3000'),
)