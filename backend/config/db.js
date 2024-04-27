import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase connected baby..");
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
