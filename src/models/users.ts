import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  role?: "user" | "admin";
  isActive?: boolean;
}

const usersSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", usersSchema);
UserModel.createIndexes();

export default UserModel;
