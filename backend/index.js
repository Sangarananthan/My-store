// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utils
import { connectDb } from "./config/db.js";
import userRouter from "./router/userRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);

app.listen(port, () => console.log(`server running on port ${port}`));
