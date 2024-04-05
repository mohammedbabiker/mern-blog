import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    content: String,
    summary: String,
    cover: String,
  },
  { timestamps: true },
);

const PostModel = model("Post", postSchema);

export default PostModel;
