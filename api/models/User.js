import mongoose from "mongoose";

const { Schema, model } = mongoose; // cause we import it ubove

const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true, min: 8 },
});

const UserModel = model("User", UserSchema);

export default UserModel;
