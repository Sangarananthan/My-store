import express from "express";
const userRouter = express.Router();
import { createUser } from "../controllers/userController.js";

userRouter.route("/").post(createUser);

export default userRouter;
