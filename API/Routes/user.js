import express from "express";
import { login, register, users, profile } from "../Controllers/user.js";
import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

// register user

router.post("/register", register); //=> /api/user/register

router.post("/login", login); //=> /api/user/login

router.get("/all", users); //=> /api/user/users

// get user profile
router.get("/profile", Authenticated, profile); //=> /api/user/profile

export default router;
