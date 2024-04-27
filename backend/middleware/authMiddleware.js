import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Check for authenticated user
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //   Read jwt from JWT cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authenticated , token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Login First");
  }
});

// Check if Admin
const authorisedAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("User not Authorised as an Admin");
  }
});

export { authenticate, authorisedAdmin };
