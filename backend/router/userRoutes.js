import express from "express";
const userRouter = express.Router();
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentprofile,
  updateCurrentprofile,
  deleteUserbyId,
  getUserByID,
  updateUserByid,
} from "../controllers/userController.js";
import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";
userRouter
  .route("/")
  .post(createUser)
  .get(authenticate, authorisedAdmin, getAllUsers);
userRouter.post("/auth", loginUser);
userRouter.post("/logout", logoutCurrentUser);
userRouter
  .route("/profile")
  .get(authenticate, getCurrentprofile)
  .put(authenticate, updateCurrentprofile);
userRouter
  .route("/:id")
  .delete(authenticate, authorisedAdmin, deleteUserbyId)
  .get(authenticate, getUserByID)
  .put(authenticate, authorisedAdmin, updateUserByid);
export default userRouter;
