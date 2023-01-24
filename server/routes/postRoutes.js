import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config(); // Load .env file
const router = express.Router(); // Create express router


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); 
// Routes
// Get All Posts
router.route('/').get(async (req, res) => {
    try {
        const post = await Post.find({}); // Get all posts from database
        res.status(200).json({success: true, data: post}); // Send response
    } catch (error) {
        res.status(500).json({success: false, message: error}); // Send error response if error occurs
    }
});

// Create a PosT
router.route('/').post(async (req, res) => {
    try {
        const {name, prompt, photo} = req.body; // Get name, prompt and photo from request body
    const photoUrl = await cloudinary.uploader.upload(photo, {folder: 'dalle'}); // Upload photo to cloudinary
    const newPost = await Post.create({name, prompt, photo: photoUrl.url,}); // Create new post

    res.status(201).json({success: true, data: newPost}); // Send response
    } catch (error) {
        // console.log(error);
        res.status(500).json({success: false, message: error}); // Send error response if error occurs
    }
});

export default router;