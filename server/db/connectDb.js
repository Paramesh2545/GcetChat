import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");
  } catch (e) {
    console.log(e);
  }
};
