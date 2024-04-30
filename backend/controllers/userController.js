import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import createTokens from "../utils/createTokens.js";

// CREATING USER
const createUser = asyncHandler(async (req, res) => {
  // Destructure Body
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all Credentials");
  }
  //   Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User Already Registered");
  }
  // Create new User Model
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    createTokens(res, newUser._id);
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

// LOGING IN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  if (!validUser) {
    res.status(400);
    throw new Error("User not Registered");
  }
  const isPassword = await bcrypt.compare(password, validUser.password);
  if (!isPassword) {
    res.status(400);
    throw new Error("Enter correct Password :(");
  }

  try {
    createTokens(res, validUser._id);
    res.status(200).json({
      message: "Login Succesfully :)",
      username: validUser.username,
      email,
      isAdmin: validUser.isAdmin,
    });
  } catch (error) {
    res.status(400).send("Server Error");
  }
});

// LOGOUT USER
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out succesfully :)" });
});

// GET ALL USERS
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  try {
    res.json(users);
  } catch (error) {
    res.status(400);
    throw new Error("No users Found");
  }
});

// GET CURRENT PROFILE
const getCurrentprofile = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    res.json({
      username: req.user.username,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } catch (error) {
    throw new Error(`Error occurred in fetching Profile info ${error}`);
  }
});

//UPDATE CURRENT PROFILE
const updateCurrentprofile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400);
      throw new Error("User not Registered");
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password || req.body.oldPassword) {
      if (!req.body.password || !req.body.oldPassword) {
        return res.status(400).json({ message: "Coudn't update password" });
      }
      const isPasswordValid = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );

      if (isPasswordValid) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      } else {
        return res
          .status(400)
          .json({ message: "Enter your Current password correctly" });
      }
    }

    await user.save(); // Await the save operation
    res.status(200).json({
      message: "Profile updated successfully",
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE USER BY ID
const deleteUserbyId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send("User not found");
  }
  try {
    if (user.isAdmin) {
      return res.status(400).send("Admins can't be deleted 😎");
    } else {
      await User.deleteOne({ _id: user._id });
      return res.status(200).send(`${user.username} deleted successfully`);
    }
  } catch (error) {
    return res.status(400).send("Error in deleting User " + error);
  }
});

// GET USER BY ID
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

// UPDATE USER BY ID
const updateUserByid = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    await user.save();
    res.json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user ID");
  }
});

// Exporting all controllers
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentprofile,
  updateCurrentprofile,
  deleteUserbyId,
  getUserByID,
  updateUserByid,
};
