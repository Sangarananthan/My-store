import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect();
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
