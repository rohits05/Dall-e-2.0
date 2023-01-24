import express from 'express';
import * as dotenv from 'dotenv';
// import {v2 as cloudinary} from 'cloudinary';
import { Configuration, OpenAIApi } from 'openai';

// import Post from '../mongodb/models/post.js';

dotenv.config(); // Load .env file
const router = express.Router(); // Create express router

// const openai = new OpenAIApi();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); // Configuration object for OpenAI API


const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send('Dalle API is working');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body; // Get prompt from request body
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        }); // Create image from prompt

        const image = aiResponse.data.data[0].b64_json; // Get image from response
        res.status(200).json({photo: image }); // Send response
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message); // Send error response if error occurs
    }
});

export default router;