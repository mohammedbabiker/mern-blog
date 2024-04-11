import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Post from "./models/Post.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadMiddleware = multer({ dest: "uploads/" });

const salt = bcrypt.genSaltSync(10); // for pass encryption
const secret = "mysecret";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads")); // serve static files end

mongoose
  .connect(process.env.mongodb_connection, {})
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password); // true or false
    if (passOk) {
      // login successfully
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (e) {
    return res.status(401).json({ message: e });
  }
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (e) {
    return res.status(401).json({ message: e });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.cookie("token", "").json("ok");
  } catch (e) {
    return res.status(401).json({ message: e });
  }
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (e) {
    return res.status(401).json({ message: e });
  }
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
  } catch (e) {
    res.status(400).json({ message: e });
    return;
  }
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content, id } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("You are not the author of this post");
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      res.json(postDoc);
    });
  } catch (e) {
    res.status(401).json({ message: e });
    return;
  }
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(17);
    res.json(posts);
  } catch (e) {
    res.status(400).json({ message: e });
    return;
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", "username");
    res.json(postDoc);
  } catch (e) {
    res.status(400).json({ message: e });
    return;
  }
});

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
