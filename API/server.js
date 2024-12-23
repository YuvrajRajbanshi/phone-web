import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js";
import productsRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// user Router
app.get("/", (req, res) => {
  res.json({ message: "Hello Bro i am from home api" });
});

// All about users operation
app.use("/api/user", userRouter);

// All about producs operation
app.use("/api/product", productsRouter);

// All about cart yar
app.use("/api/cart", cartRouter);

// address router
app.use("/api/address", addressRouter);

mongoose
  .connect(
    "mongodb+srv://singhraj0461:3Qez23kIvuNG0LRE@cluster0.8io1t.mongodb.net/",
    {
      dbName: "E-commerce",
    }
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
