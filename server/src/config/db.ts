import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL!, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err: Error) => {
      console.error("Error connecting to MongoDB", err);
    });
};

export default dbConnect;
