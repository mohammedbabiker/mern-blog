import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
const app = express();
const PORT = 4000;

const salt = bcrypt.genSaltSync(10); // for pass encryption
const secret = "mysecret";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

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
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password); // true or false
  if (passOk) {
    // login successfully
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
