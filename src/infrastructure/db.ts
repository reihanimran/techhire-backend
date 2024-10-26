import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URL;
        if(!connectionString) {
            throw new Error("PLease add connection string");
        }
        await mongoose.connect(connectionString);
        console.log("DB connection Successful");
    } catch (error) {
        console.log("DB connection Failed");
        console.log(error);
    }
}