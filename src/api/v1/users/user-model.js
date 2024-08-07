import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    age: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", userSchema);
