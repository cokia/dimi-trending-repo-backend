import mongoose from "mongoose";
import { IUser } from "../types";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  githubid: { type: String, required: true }
});

export default mongoose.model<IUser>("user", userSchema);
