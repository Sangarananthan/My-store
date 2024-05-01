import mongoose, { trusted } from "mongoose";

export const categoryShema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

const Category = mongoose.model("Category", categoryShema);
export default Category;
