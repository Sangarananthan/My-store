import express from "express";
import formidable from "express-formidable";
import { authenticate, authorisedAdmin } from "../middleware/authMiddleware.js";
import checkID from "../middleware/checkID.js";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorisedAdmin, formidable(), addProduct);
router.route("/allproducts").get(fetchAllProducts);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .get(fetchById)
  .put(authenticate, authorisedAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorisedAdmin, removeProduct);

router
  .route("/:id/reviews")
  .post(authenticate, authorisedAdmin, addProductReview);

export default router;
