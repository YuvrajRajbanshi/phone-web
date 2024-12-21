import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProductQty,
  removeProductFromCart,
  userCart,
} from "../Controllers/cart.js";
import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

// add to cart
router.post("/add", Authenticated, addToCart);

// find particular user cart
router.get("/user", Authenticated, userCart);

// remove the cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

// clear the cart
router.delete("/clear", Authenticated, clearCart);

// decrease items qty

router.post("/--qty", Authenticated, decreaseProductQty);

export default router;
