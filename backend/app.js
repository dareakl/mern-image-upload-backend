import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import connectDB from "./db/dbconfig.js";
import Image from "./model/Image.js";
import upload from "./multerconfig.js";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { log } from "console";

dotenv.config();
connectDB();
const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const uploadsPath = join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));
app.use(cors());

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
        id: image._id,
        title: image.title,
        description: image.description,
        imageUrl: `http://localhost:4000/${image.image}`,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

// GET IMAGES
app.get("/images", async (req, res, next) => {
  const images = await Image.find({});
  if (images) {
    const response = images.map((image) => ({
      id: image._id,
      title: image.title,
      description: image.description,
      imageUrl: `http://localhost:4000/${image.image}`,
    }));
    res.send(response);
  }
});

// DELETE image
app.delete("/image/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const image = await Image.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    fs.unlinkSync(image.image);
    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.listen(PORT, () => console.log("Server started"));
