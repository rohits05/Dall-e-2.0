import mongoose from "mongoose";

const coonectDB = (url) => {
    mongoose.set('strictQuery', true); // strictQuery: true, strict: true for search functionality!
    // mongoose.set('useFindAndModify', false);
    mongoose.connect(url).then(() => {
        console.log("MongoDB Connected") // If connection is successful
    }).catch((err) => {
        console.log(err) // If connection fails
    })
}


export default coonectDB;