import express from "express";
import { Address } from "../Models/address.js";
import { addAddress, getAddress } from "../Controllers/address.js";
import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

// for adding address for the shipping
router.post("/add", Authenticated, addAddress);

// get the address for the shipping
router.get("/get", Authenticated, getAddress);
export default router;
