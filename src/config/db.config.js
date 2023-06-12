import mongoose from "mongoose";

export const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected')
    } catch (err) {
        console.log("Error connecting to database: ", err)
    }
}