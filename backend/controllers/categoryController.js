import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Creating new category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is Required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json("Already Exists");
    }
    const category = new Category({ name });
    await category.save();
    res.json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Updating Existing category using ID
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ error: "Category ID invalid" });
    }
    category.name = name;
    const updatedCatogery = await category.save();
    res.json(updatedCatogery);
  } catch (error) {
    return res.status(400).json({ error: "Internal Server Error" });
  }
});

// Delete category using ID
const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: ` deleted succesfully` });
  } catch (error) {
    return res.status(400).json({ error: "Category not found" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    return res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

// EXPORT
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
