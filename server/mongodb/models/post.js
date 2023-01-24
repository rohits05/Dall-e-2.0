import mongoose from "mongoose";

const Post = new mongoose.Schema({ // PostSchema
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
}); 

const PostSchema = mongoose.model("Post", Post); // PostSchema model 생성


export default PostSchema;