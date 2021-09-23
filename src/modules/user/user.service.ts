import { uniq } from "lodash";
import { IDBQueryParams } from "../../common/interfaces/i-db-query-params";
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

  public static async updateUser({ match, data }: IDBQueryParams): Promise<any> {
    try {
      const result = await UserModel.update(data, {
        where: match,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public static async destroyUser(match: any): Promise<any> {
    try {
      const result = await UserModel.destroy({
        where: match,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public static async getUsers({offset, limit}: {offset?: number; limit?: number}): Promise<IUser[]> {
    try {
      const users = await UserModel.findAll({
        attributes: ["id", "name", "email"],
        offset: offset ? offset : 0,
        limit: limit ? limit : 10,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserDetail({ match, attributes }: IDBQueryParams): Promise<IUser | null> {
    try {
      let project = ["id", "name", "email"];
      if (attributes) {
        project = uniq([...project, ...attributes]);
      }

      const user = UserModel.findOne({
        attributes: project,
        where: match,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
