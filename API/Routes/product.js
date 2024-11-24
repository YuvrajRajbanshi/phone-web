import express from "express";
import {
  addProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../Controllers/product.js";

const router = express.Router();

//for adding products
router.post("/add", addProduct);

// for getting products
router.get("/all", getProducts);

// for single products
router.get("/:id", getProductById);

// for updating the single products
router.put("/:id", updateProductById);

// for deleting the single products
router.delete("/:id", deleteProductById);

export default router;
