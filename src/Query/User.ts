import UserModel from "../models/User";

export default {
  async Users() {
    return await UserModel.find();
  }
};
