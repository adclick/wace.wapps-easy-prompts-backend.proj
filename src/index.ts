import express from 'express'
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Use user routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('Server ready at: http://localhost:3000'),
)