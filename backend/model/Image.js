import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
