import UserModel from "../models/User";
import { IUser } from "../types";

export default {
  async createUser(_: void, { input }: { input: IUser }) {
    return await UserModel.create(input);
  }
};
