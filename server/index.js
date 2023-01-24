import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import coonectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import bodyParser from 'body-parser';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config(); // Load .env file


const app = express(); // Create express app

// Middlewares
app.use(cors()); // Enable CORS
// app.use(bodyParser.json()); // Enable JSON parsing
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
// app.use(express.json({limit: '50mb'})); // Enable JSON parsing
app.use('/api/v1/posts', postRoutes); // Enable post routes
app.use('/api/v1/dalle', dalleRoutes); // Enable dalle routes
// Routes
app.get('/', async (req, res) => {
    res.send('DALL-E has been AcTivaTed!'); // Send response
});
// Start server
const startServer = async () => {

    try {
        coonectDB(process.env.MONGO_URL); // Connect to MongoDB
        app.listen(8080, () => {
            console.log(`Server started on port http://localhost:8080`); // Start server
        });
    } catch (err) {
        console.log(err);
    }
}
startServer(); // Start server