import { UserModel } from "../../models/user.model";
import AuthUtil from "../../utils/auth.util";
import { ICreateUser, IUser } from "./interfaces/i-user";

export default class UserService {
  constructor() {}

  public static async createUser(user: ICreateUser): Promise<number> {
    try {
      user.password = await AuthUtil.getHashedPassword(user.password);
      const result = await UserModel.create(user);
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUser(user: IUser): Promise<any> {
    try {
      const result = await UserModel.update(user, {
        where: {
          id: user.id,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public static async destroyUser(userId: number): Promise<any> {
    try {
      const result = await UserModel.destroy({
        where: {
          id: userId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public static async getUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.findAll({
        attributes: ["id", "name", "email"],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserDetail(userId: number): Promise<IUser | null> {
    try {
      const user = UserModel.findOne({
        attributes: ["id", "name", "email"],
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
