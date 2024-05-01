import express from "express";
import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
router.route("/").post(authenticate, authorisedAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authenticate, authorisedAdmin, updateCategory)
  .delete(authenticate, authorisedAdmin, removeCategory);
router.route("/list").get(listCategory);
router.route("/:id").get(readCategory);
export default router;
