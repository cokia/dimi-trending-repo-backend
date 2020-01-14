import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  department: string;
  year: string;
  githubid: string;
}
