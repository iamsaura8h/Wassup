import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true }, // path to avatar image
});

export default mongoose.model("User", userSchema);
