import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import connectDB from "./db/dbconfig.js";
import Image from "./model/Image.js";

dotenv.config();
connectDB();
const app = express();
const PORT = 4000;

app.get("/", (req, res, next) => {
  res.send("request send");
});

app.listen(PORT, () => console.log("Server started"));
