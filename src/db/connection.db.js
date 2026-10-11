import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";


export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`Fail to connect on Database >>> ${error}`);
    }
}