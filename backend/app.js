import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import connectDB from "./db/dbconfig.js";
import Image from "./model/Image.js";
import upload from "./multerconfig.js";
import fs from "fs";

dotenv.config();
connectDB();
const app = express();
const PORT = 4000;

app.get("/", (req, res, next) => {
  res.send("request send");
});

//POST Req - Image Upload
app.post("/uploads", (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    }
    // file not uploaded
    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded" });
    }

    const { title, description } = req.body;
    if (!title || !description) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: "Title or description is missing" });
    }

    //Save To DB
    try {
      const image = await Image.create({
        title,
        description,
        image: req.file.path.replace(/\\/g, "/"),
      });
      res.status(200).json({
        title: image.title,
        description: image.description,
        imageUrl: image.image,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

app.listen(PORT, () => console.log("Server started"));
