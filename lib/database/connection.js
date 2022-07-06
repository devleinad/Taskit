import mongoose from "mongoose";

export const connect = async () => {
    const conn = await mongoose.createConnection(process.env.MONGODB_CONNECTION_URI).asPromise();
    return conn;
}