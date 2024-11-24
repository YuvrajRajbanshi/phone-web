import express from "express"
import { login, register, users } from "../Controllers/user.js"


const router = express.Router()

// register user 

router.post("/register", register) //=> /api/user/register

router.post("/login", login) //=> /api/user/login

router.get("/all", users) //=> /api/user/users

export default router