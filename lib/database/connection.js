import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_CONNECTION_URI;
export const connect = async () => {
  const conn = await mongoose
    .createConnection(DB_URI.toString(), {})
    .asPromise();
  return conn;
};
