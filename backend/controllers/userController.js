import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";

// CREATING USER
const createUser = asyncHandler(async (req, res) => {
  // Destructure Body
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all Credentials 🪪");
  }
  //   Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).send("User already Exist continue Login :)");
  }
  // Create new User Model
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({
      message: "User Created Succesfully",
      username,
      email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

export { createUser };
