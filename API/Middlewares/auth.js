import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token)
    return res.json({
      message: "Unauthorized Plese login first",
      success: false,
    });

  const decoded = jwt.verify(token, "secret");
  const id = decoded.userId;
  let user = await User.findById(id);

  if (!user)
    return res.json({
      message: "User not found",
      success: false,
    });
  req.user = user;
  next();
};
