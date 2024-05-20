require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
export const connectDb = async () => {
  try {
    if (!process.env.DB_URL) {
      console.error('MONGODB_URI environment variable is not defined.');
      process.exit(1);
    }
    const mongo_url: string = process.env.DB_URL;
    await mongoose.connect(mongo_url, {
      dbName: 'Cluster0',
    });
    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};